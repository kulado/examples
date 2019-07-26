import * as aws from "@kulado/aws";
import * as eks from "@kulado/eks";
import * as kulado from "@kulado/kulado";

// Creates an EKS NodeGroup.
interface NodeGroupArgs {
    ami: string;
    instanceType: kulado.Input<aws.ec2.InstanceType>;
    desiredCapacity: kulado.Input<number>;
    cluster: eks.Cluster;
    instanceProfile: aws.iam.InstanceProfile;
    taints?: kulado.Input<any>;
}
export function createNodeGroup(
    name: string,
    args: NodeGroupArgs,
): eks.NodeGroup {
    return new eks.NodeGroup(name, {
        cluster: args.cluster,
        nodeSecurityGroup: args.cluster.nodeSecurityGroup,
        clusterIngressRule: args.cluster.eksClusterIngressRule,
        instanceType: args.instanceType,
        amiId: args.ami,
        nodeAssociatePublicIpAddress: false,
        desiredCapacity: args.desiredCapacity,
        minSize: args.desiredCapacity,
        maxSize: 10,
        instanceProfile: args.instanceProfile,
        labels: {"amiId": args.ami},
        taints: args.taints,
    }, {
        providers: { kubernetes: args.cluster.provider},
    });
}
