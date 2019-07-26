import * as kulado from "@kulado/kulado";
import * as aws from "@kulado/aws";

const config = new kulado.Config();
const roleToAssumeARN = config.require("roleToAssumeARN");

const provider = new aws.Provider("privileged", {
    assumeRole: {
        roleArn: roleToAssumeARN,
        sessionName: "KuladoSession",
        externalId: "KuladoApplication",
    },
    region: aws.config.requireRegion(),
});

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket", {}, {provider: provider});

// Export the DNS name of the bucket
export const bucketName = bucket.bucketDomainName;
