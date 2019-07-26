// Copyright 2016-2018, Kulado Corporation.  All rights reserved.

import * as k8s from "@kulado/kubernetes";
import * as kulado from "@kulado/kulado";
import { k8sProvider, k8sConfig } from "./cluster";

// Create a canary deployment to test that this cluster works.
const name = `${kulado.getProject()}-${kulado.getStack()}`;
const canaryLabels = { app: `canary-${name}` };
const canary = new k8s.apps.v1beta1.Deployment("canary", {
    spec: {
        selector: { matchLabels: canaryLabels },
        replicas: 1,
        template: {
            metadata: { labels: canaryLabels },
            spec: { containers: [{ name, image: "nginx" }] },
        },
    },
}, { provider: k8sProvider });

// Export the Kubeconfig so that clients can easily access our cluster.
export let kubeConfig = k8sConfig;
