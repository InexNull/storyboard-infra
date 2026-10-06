import * as cdk from 'aws-cdk-lib';

export enum Stage {
    DEV = "dev",
    PROD = "prod"
}

export interface StackProps extends cdk.StackProps {
    stage: Stage;
}