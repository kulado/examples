// Copyright 2016-2018, Kulado Corporation.  All rights reserved.

import * as kulado from "@kulado/kulado";

export interface StorageStaticWebsiteArgs {
    accountName: kulado.Input<string>;
}

const accountNameProp = "accountName";

// There's currently no way to enable the Static Web Site feature of a storage account via ARM
// Therefore, we created a custom provider which wraps corresponding Azure CLI commands
class StorageStaticWebsiteProvider implements kulado.dynamic.ResourceProvider {

    public async check(olds: any, news: any): Promise<kulado.dynamic.CheckResult> {
        const failures = [];

        if (news[accountNameProp] === undefined) {
            failures.push({property: accountNameProp, reason: `required property '${accountNameProp}' missing`});
        }

        return { inputs: news, failures };
    }

    public async diff(id: kulado.ID, olds: any, news: any): Promise<kulado.dynamic.DiffResult> {
        const replaces = [];

        if (olds[accountNameProp] !== news[accountNameProp]) {
            replaces.push(accountNameProp);
        }

        return { replaces };
    }

    public async create(inputs: any): Promise<kulado.dynamic.CreateResult> {
        const { execSync } = require("child_process");
        const url = require('url');
        const accountName = inputs[accountNameProp];

        // Helper function to execute a command, supress the warnings from polluting the output, and parse the result as JSON
        const executeToJson = (command: string) => JSON.parse(execSync(command, { stdio: ["pipe", "pipe", "ignore"] }).toString());

        // Install Azure CLI extension for storage (currently, only the preview version has the one we need)
        execSync("az extension add --name storage-preview", { stdio: "ignore" });

        // Update the service properties of the storage account to enable static website and validate the result
        const update = executeToJson(`az storage blob service-properties update --account-name "${accountName}" --static-website --404-document 404.html --index-document index.html`);
        if (!update.staticWebsite.enabled) {
            throw new Error(`Static website update failed: ${update}`);
        }

        // Extract the web endpoint and the hostname from the storage account
        const endpoint = executeToJson(`az storage account show -n "${accountName}" --query "primaryEndpoints.web"`);        
        const hostName = url.parse(endpoint).hostname;

        // Files for static websites should be stored in a special built-in container called '$web', see https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website
        const webContainerName = "$web";

        return { 
            id: `${accountName}StaticWebsite`,
            outs: { endpoint, hostName, webContainerName }
        };
    }
}

export class StorageStaticWebsite extends kulado.dynamic.Resource {
    public readonly endpoint: kulado.Output<string>;
    public readonly hostName: kulado.Output<string>;
    public readonly webContainerName: kulado.Output<string>;

    constructor(name: string, args: StorageStaticWebsiteArgs, opts?: kulado.CustomResourceOptions) {
        super(new StorageStaticWebsiteProvider(), name, { ...args, endpoint: undefined, hostName: undefined, webContainerName: undefined }, opts);
    }
}
