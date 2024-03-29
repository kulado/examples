// Copyright 2016-2017, Kulado Corporation.  All rights reserved.

import * as kulado from "@kulado/kulado";
import * as aws from "@kulado/aws";
import * as awsx from "@kulado/awsx";
import * as config from "./config";

// A simple cache abstraction that wraps Redis.
export class Cache {
    private readonly redis: awsx.ecs.FargateService;
    private readonly endpoint: kulado.Output<awsx.elasticloadbalancingv2.ListenerEndpoint>;

    constructor(name: string, memory: number = 128) {
        let pw = config.redisPassword;
        let listener = new awsx.elasticloadbalancingv2.NetworkListener(name, { port: 6379 });
        this.redis = new awsx.ecs.FargateService(name, {
            taskDefinitionArgs: {
                containers: {
                    redis: {
                        image: "redis:alpine",
                        memory: memory,
                        portMappings: [listener],
                        command: ["redis-server", "--requirepass", pw],
                    },
                },
            },
        });

        this.endpoint = listener.endpoint;
    }

    public get(key: string): Promise<string> {
        let ep = this.endpoint.get();
        console.log(`Getting key '${key}' on Redis@${ep.hostname}:${ep.port}`);

        let client = require("redis").createClient(ep.port, ep.hostname, { password: config.redisPassword });
        return new Promise<string>((resolve, reject) => {
            client.get(key, (err: any, v: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(v);
                }
            });
        });
    }

    public set(key: string, value: string): Promise<void> {
        let ep = this.endpoint.get();
        console.log(`Setting key '${key}' to '${value}' on Redis@${ep.hostname}:${ep.port}`);

        let client = require("redis").createClient(ep.port, ep.hostname, { password: config.redisPassword });
        return new Promise<void>((resolve, reject) => {
            client.set(key, value, (err: any, v: any) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("Set succeed: " + JSON.stringify(v))
                    resolve();
                }
            });
        });
    };
}
