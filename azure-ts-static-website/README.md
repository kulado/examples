[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# A Static Website Hosted on Azure Blob Storage + Azure CDN

This example configures [Static website hosting in Azure Storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website). One complication is the fact that the Static Website feature of Storage Accounts is not part of Azure Resource Manager, and is not configurable directly via Kulado Azure provider.

As a workaround, a custom [dynamic provider](https://kulado.io/reference/programming-model/#dynamicproviders) and a dynamic resource are created. The provider delegates the setup to Azure CLI commands, while still providing Kulado experience and lifecycle management.

In addition to the Storage itself, a CDN is configured to serve files from the Blob container origin. This may be useful if you need to serve files via HTTPS from a custom domain (not shown in the example).

## Running the App

1.  Create a new stack:

    ```
    $ kulado stack init dev
    ```

1.  Login to Azure CLI (you will be prompted to do this during deployment if you forget this step):

    ```
    $ az login
    ```

1.  Restore NPM dependencies:

    ```
    $ npm install
    ```

1.  Run `kulado up` to preview and deploy changes:

    ``` 
    $ kulado up
    Previewing changes:
    ...

    Performing changes:
    ...
    Resources:
        + 8 created
    Duration: 2m52s
    ```

1.  Check the deployed website endpoint:

    ```
    $ kulado stack output staticEndpoint
    https://websitesbc90978a1.z20.web.core.windows.net/
    $ curl "$(kulado stack output staticEndpoint)"
    <html>
        <body>
            <h1>This file is served from Blob Storage</h1>
        </body>
    </html>
    ```
