// Copyright 2016-2018, Kulado Corporation.  All rights reserved.

import * as kulado from "@kulado/kulado";
import * as k8s from "@kulado/kubernetes";

let config = new kulado.Config();

let nginxLabels = { app: "nginx" };
let nginxDeployment = new k8s.apps.v1.Deployment("nginx-deployment", {
    spec: {
        selector: { matchLabels: nginxLabels },
        replicas: config.getNumber("replicas") || 2,
        template: {
            metadata: { labels: nginxLabels },
            spec: {
                containers: [{
                    name: "nginx",
                    image: "nginx:1.7.9",
                    ports: [{ containerPort: 80 }]
                }],
            },
        },
    },
});

export let nginx = nginxDeployment.metadata.name;
