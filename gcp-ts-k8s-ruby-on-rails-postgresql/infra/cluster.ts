// Copyright 2016-2018, Kulado Corporation.  All rights reserved.

import * as gcp from "@kulado/gcp";
import * as k8s from "@kulado/kubernetes";
import * as kulado from "@kulado/kulado";
import { clusterNodeCount, clusterNodeMachineType, clusterPassword, clusterUsername } from "./config";

// Find the latest engine version.
const engineVersion = gcp.container.getEngineVersions().then(v => v.latestMasterVersion);

// Create the GKE cluster and export it.
export const cluster = new gcp.container.Cluster("gke-cluster", {
    initialNodeCount: clusterNodeCount,
    nodeVersion: engineVersion,
    minMasterVersion: engineVersion,
    masterAuth: { username: clusterUsername, password: clusterPassword },
    nodeConfig: {
        machineType: clusterNodeMachineType,
        oauthScopes: [
            "https://www.googleapis.com/auth/compute",
            "https://www.googleapis.com/auth/devstorage.read_only",
            "https://www.googleapis.com/auth/logging.write",
            "https://www.googleapis.com/auth/monitoring"
        ],
    },
});

// Manufacture a GKE-style Kubeconfig. Note that this is slightly "different" because of the way GKE requires
// gcloud to be in the picture for cluster authentication (rather than using the client cert/key directly).
export const config = kulado.
    all([ cluster.name, cluster.endpoint, cluster.masterAuth ]).
    apply(([ name, endpoint, auth ]) => {
        const context = `${gcp.config.project}_${gcp.config.zone}_${name}`;
        return `apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: ${auth.clusterCaCertificate}
    server: https://${endpoint}
  name: ${context}
contexts:
- context:
    cluster: ${context}
    user: ${context}
  name: ${context}
current-context: ${context}
kind: Config
preferences: {}
users:
- name: ${context}
  user:
    auth-provider:
      config:
        cmd-args: config config-helper --format=json
        cmd-path: gcloud
        expiry-key: '{.credential.token_expiry}'
        token-key: '{.credential.access_token}'
      name: gcp
`;
    });

// Export a Kubernetes provider instance that uses our cluster from above.
export const provider = new k8s.Provider("gke-k8s", {
    kubeconfig: config,
});
