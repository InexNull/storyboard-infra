import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';

export interface CertStackProps extends cdk.StackProps {
  readonly zoneName: string;
  readonly webDomain: string;
  readonly altWebDomains?: string[];
  readonly apiDomain: string;
}

export class CertStack extends cdk.Stack {
  public readonly webCertificate: acm.ICertificate;
  public readonly apiCertificate: acm.ICertificate;

  constructor(scope: Construct, id: string, props: CertStackProps) {
    super(scope, id, props);

    // Ensure the stack is deployed to us-east-1 (required for CloudFront certificates)
    if (this.region !== 'us-east-1') {
      throw new Error("CertStack must be explicitly deployed in us-east-1");
    }

    const zone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: props.zoneName,
    });

    this.webCertificate = new acm.Certificate(this, 'WebCertificate', {
      domainName: props.webDomain,
      subjectAlternativeNames: props.altWebDomains,
      validation: acm.CertificateValidation.fromDns(zone),
    });

    this.apiCertificate = new acm.Certificate(this, 'ApiCertificate', {
      domainName: props.apiDomain,
      validation: acm.CertificateValidation.fromDns(zone),
    });
  }
}