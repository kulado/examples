import * as kulado from "@kulado/kulado";
import * as aws from "@kulado/aws";

const config = new kulado.Config();
const unprivilegedUsername = config.require("unprivilegedUsername");

const unprivilegedUser = new aws.iam.User("unprivileged-user", {
    name: unprivilegedUsername,
});

const unprivilegedUserCreds = new aws.iam.AccessKey("unprivileged-user-key", {
    user: unprivilegedUser.name,
});

const allowS3ManagementRole = new aws.iam.Role("allow-s3-management", {
    description: "Allow management of S3 buckets",
    assumeRolePolicy: unprivilegedUser.arn.apply(arn => {
        return aws.iam.assumeRolePolicyForPrincipal({AWS: arn})
    }),
});

new aws.iam.RolePolicy("allow-s3-management-policy", {
    role: allowS3ManagementRole,
    policy: {
        Version: "2012-10-17",
        Statement: [{
            Sid: "AllowS3Management",
            Effect: "Allow",
            Resource: "*",
            Action: "s3:*",
        }]
    }
}, {parent: allowS3ManagementRole});

export const roleArn = allowS3ManagementRole.arn;
export const accessKeyId = unprivilegedUserCreds.id;
export const secretAccessKey = unprivilegedUserCreds.secret;
