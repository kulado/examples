// Copyright 2016-2018, Kulado Corporation.  All rights reserved.

import * as kulado from "@kulado/kulado";
import * as aws from "@kulado/aws";
import * as awsx from "@kulado/awsx";
import * as cloud from "@kulado/cloud-aws";
import * as cache from "./cache";
import * as express from "express";
import * as fs from "fs";
import * as mime from "mime-types";

type AsyncRequestHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;

const asyncMiddleware = (fn: AsyncRequestHandler) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

// Create a table `urls`, with `name` as primary key.
let urlTable = new cloud.Table("urls", "name");

// Create a cache of frequently accessed urls.
let urlCache = new cache.Cache("urlcache");

// Create a web server.
let httpServer = new cloud.HttpServer("urlshortener", () => {
    let app = express();

    // GET /url lists all URLs currently registered.
    app.get("/url", asyncMiddleware(async (req, res) => {
        try {
            let items = await urlTable.scan();
            res.status(200).json(items);
            console.log(`GET /url retrieved ${items.length} items`);
        } catch (err) {
            res.status(500).json(err.stack);
            console.log(`GET /url error: ${err.stack}`);
        }
    }));

    // GET /url/{name} redirects to the target URL based on a short-name.
    app.get("/url/:name", asyncMiddleware(async (req, res) => {
        let name = req.params.name
        try {
            // First try the Redis cache.
            let url = await urlCache.get(name);
            if (url) {
                console.log(`Retrieved value from Redis: ${url}`);
                res.setHeader("X-Powered-By", "redis");
            }
            else {
                // If we didn't find it in the cache, consult the table.
                let value = await urlTable.get({name});
                url = value && value.url;
                if (url) {
                    urlCache.set(name, url); // cache it for next time.
                }
            }

            // If we found an entry, 301 redirect to it; else, 404.
            if (url) {
                res.setHeader("Location", url);
                res.status(302);
                res.end("");
                console.log(`GET /url/${name} => ${url}`)
            }
            else {
                res.status(404);
                res.end("");
                console.log(`GET /url/${name} is missing (404)`)
            }
        } catch (err) {
            res.status(500).json(err.stack);
            console.log(`GET /url/${name} error: ${err.stack}`);
        }
    }));

    // POST /url registers a new URL with a given short-name.
    app.post("/url", asyncMiddleware(async (req, res) => {
        const url = <string>req.query["url"];
        const name = <string>req.query["name"];
        try {
            await urlTable.insert({ name, url });
            await urlCache.set(name, url);
            res.json({ shortenedURLName: name });
            console.log(`POST /url/${name} => ${url}`);
        } catch (err) {
            res.status(500).json(err.stack);
            console.log(`POST /url/${name} => ${url} error: ${err.stack}`);
        }
    }));

    // Serve all files in the www directory to the root.
    // Note: www will be auto-included using config. either
    //      cloud-aws:functionIncludePaths or

    // staticRoutes(app, "/", "www");
    app.use("/", express.static("www"));

    app.get("*", (req, res) => {
        res.json({ uncaught: { url: req.url, baseUrl: req.baseUrl, originalUrl: req.originalUrl, version: process.version } });
    });

    return app;
});

export let endpointUrl = kulado.interpolate `${httpServer.url}index.html`;
