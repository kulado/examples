// Copyright 2017, Kulado Corporation.  All rights reserved.

import * as kulado from "@kulado/kulado";
import * as cloud from "@kulado/cloud";

// Get the password to use for Redis from config.
let config = new kulado.Config();
let redisPassword = config.require("redisPassword");
let redisPort = 6379;

// The data layer for the application
// Use the 'image' property to point to a pre-built Docker image.
let redisCache = new cloud.Service("voting-app-cache", {
    containers: {
        redis: {
            image: "redis:alpine",
            memory: 512,
            ports: [{ port: redisPort }],
            command: ["redis-server", "--requirepass", redisPassword],
        },
    },
});

let redisEndpoint = redisCache.endpoints.redis[redisPort];

// A custom container for the frontend, which is a Python Flask app
// Use the 'build' property to specify a folder that contains a Dockerfile.
// Kulado builds the container for you and pushes to an ECR registry
let frontend = new cloud.Service("voting-app-frontend", {
    containers: {
        votingAppFrontend: {
            build: "./frontend",   // path to the folder containing the Dockerfile
            memory: 512,
            ports: [{ port: 80 }],
            environment: {
                // pass the Redis container info in environment variables
                "REDIS":      redisEndpoint.hostname,
                "REDIS_PORT": redisEndpoint.apply(e => e.port.toString()),
                "REDIS_PWD":  redisPassword
            }
        },
    },
});

// Export a variable that will be displayed during 'kulado up'
export let frontendURL = frontend.endpoints["votingAppFrontend"][80].hostname;
