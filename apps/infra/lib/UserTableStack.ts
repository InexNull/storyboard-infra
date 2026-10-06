import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { StackProps, Stage } from './types';

const deletionProtectionByStage: Record<Stage, boolean> = {
    [Stage.DEV]: false,
    [Stage.PROD]: true, // Please do not delete the production database
};

export interface UserTableStackProps extends StackProps {
    readonly replicaRegion: string;
    readonly witnessRegion: string;
}

export class UserTableStack extends cdk.Stack {
    public readonly userTable: dynamodb.TableV2;
    constructor(scope: Construct, id: string, props: UserTableStackProps) {
        super(scope, id, props);

        const deletionProtection: boolean = deletionProtectionByStage[props.stage];

        this.userTable = new dynamodb.TableV2(this, "UserTable", {
            partitionKey: { name: "pk1", type: dynamodb.AttributeType.STRING },
            multiRegionConsistency: dynamodb.MultiRegionConsistency.STRONG,
            replicas: [
                { region: props.replicaRegion }
            ],
            witnessRegion: props.witnessRegion,
            deletionProtection,
            // Necessary for the username -> ID lookup while keeping users 1 row for atomicity (no transactions with strong consistency)
            globalSecondaryIndexes: [
                {
                    "indexName": "gsi1",
                    "partitionKey": { name: "pk2", type: dynamodb.AttributeType.STRING }
                }
            ]
        });
    }
}

// GSI won't ensure username uniqueness... so how
// Give each user a VERSION starting at 0.
// Use an item as a "lock" for the username.
// When a user is created, use a conditional write to create a lock on that username pk=usernameclaim#user1 type="creation_reservation" userid=1234 timeout=T+15s uid=acb123
//  - if timeout expires & the user id does not exist, we assume creation failed and anyone can attempt to claim the lock conditionally checking against uid
// When a user renames, use a conditional write to create a lock pk=usernameclaim#user2 type="rename_reservation" userid=1234 userversion=V+1 timeout=T=15 uid=abc432
// Next, update the user row to have the username and increment the version by 1
// The old claim frees itself automatically as V changes, but delete it anyway as a last step to make claim logic for previous usernames simpler in the vast majority of cases where the entire script executes without error
// When the rename_reservation lock exists, it is considered valid before the timeout expires OR when the version equals the user version
// 15 seconds handles race conditions & invalidation in case of failure before the username applies, matching version acts as the long-term claim
// the UID is so when a function sees "the lock exists but is not valid, I can claim it", it can conditionally check against the UID to prevent two separate functions from both claiming it at once
// Note that if I do this, I do not need a GSI as the lock/reservation itself can be used to locate the user