import * as eks from "@kulado/eks";
import * as k8s from "@kulado/kubernetes";
import * as kulado from "@kulado/kulado";

// Create the echoserver workload's Service, Deployment and Ingress.
interface EchoserverArgs {
    replicas: kulado.Input<number>;
    namespace: kulado.Input<string>;
    ingressClass: kulado.Input<string>;
    provider: k8s.Provider;
}
export function create(
    name: string,
    args: EchoserverArgs,
): k8s.core.v1.Service {

    const labels = {app: name};

    // Create the Service.
    const service = createService(name, {
        labels: labels,
        namespace: args.namespace,
        provider: args.provider,
    });
    const serviceName = service.metadata.name;

    // Deploy the echoserver in the general, standard nodegroup.
    const deployment = createDeployment(name, {
        replicas: args.replicas,
        labels: labels,
        namespace: args.namespace,
        provider: args.provider,
    });

    // Create the Ingress.
    const ingress = createIngress(name, {
        labels: labels,
        namespace: args.namespace,
        ingressClass: args.ingressClass,
        serviceName: serviceName,
        provider: args.provider,
    });

    return service;
}

interface EchoserverServiceArgs {
    labels: kulado.Input<any>;
    namespace: kulado.Input<string>;
    provider: k8s.Provider;
}
export function createService(
    name: string,
    args: EchoserverServiceArgs,
): k8s.core.v1.Service {
    return new k8s.core.v1.Service(
        name,
        {
            metadata: {
                labels: args.labels,
                namespace: args.namespace,
            },
            spec: {
                type: "ClusterIP",
                ports: [{port: 80, protocol: "TCP", targetPort: "http"}],
                selector: args.labels,
            },
        },
        {
            provider: args.provider,
        },
    );
}

interface EchoserverDeploymentArgs {
    replicas: kulado.Input<number>;
    labels: kulado.Input<any>;
    namespace: kulado.Input<string>;
    provider: k8s.Provider;
}
export function createDeployment(
    name: string,
    args: EchoserverDeploymentArgs,
): k8s.apps.v1.Deployment {
    return new k8s.apps.v1.Deployment(name,
        {
            metadata: {
                labels: args.labels,
                namespace: args.namespace,
            },
            spec: {
                replicas: args.replicas,
                selector: { matchLabels: args.labels },
                template: {
                    metadata: { labels: args.labels, namespace: args.namespace },
                    spec: {
                        restartPolicy: "Always",
                        containers: [
                            {
                                name: name,
                                image: "gcr.io/google-containers/echoserver:1.5",
                                ports: [{ name: "http", containerPort: 8080 }],
                            },
                        ],
                    },
                },
            },
        },
        {
            provider: args.provider,
        },
    );
}

interface EchoserverIngressArgs {
    labels: kulado.Input<any>;
    namespace: kulado.Input<string>;
    ingressClass: kulado.Input<string>;
    serviceName: kulado.Input<string>;
    provider: k8s.Provider;
}
export function createIngress(
    name: string,
    args: EchoserverIngressArgs,
): k8s.extensions.v1beta1.Ingress {
    // TODO(metral): change to k8s.networking.v1beta.Ingress
    // when EKS supports >= 1.14.
    return new k8s.extensions.v1beta1.Ingress(
        name,
        {
            metadata: {
                labels: args.labels,
                namespace: args.namespace,
                annotations: {
                    "kubernetes.io/ingress.class": args.ingressClass,
                },
            },
            spec: {
                rules: [
                    {
                        host: "apps.example.com",
                        http: {
                            paths: [
                                {
                                    path: "/echoserver",
                                    backend: {
                                        serviceName: args.serviceName,
                                        servicePort: "http",
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            provider: args.provider,
        },
    );
}
