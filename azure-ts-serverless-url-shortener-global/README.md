[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Globally distributed serverless URL-shortener

Multi-region deployment of Azure Functions and Cosmos DB with Traffic Manager

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

1.  Specify the Azure regions to deploy the application:

    ```
    $ kulado config set locations westus,westeurope
    ```

1.  Run `kulado up` to preview and deploy changes:

    ``` 
    $ kulado up
    Previewing changes:
    ...

    Performing changes:
    ...
    info: 23 changes performed:
        + 23 resources created
    Update duration: 21m33.3252322s
    ```

1.  Add a short URL:

    ```
    $ kulado stack output addEndpoint
    https://urlshort-add94ac80f8.azurewebsites.net/api/urlshort-add
    $ curl -H "Content-Type: application/json" \
        --request POST \
        -D '{"id":"kulado","url":"https://kulado.io"}' \
        "$(kulado stack output addEndpoint)"    
    Short URL saved
    ```

1.  Query a short URL:

    ```
    $ kulado stack output endpoint
    http://urlshort-tm.trafficmanager.net/api/{key}
    $ curl http://urlshort-tm.trafficmanager.net/api/kulado
    <!doctype html>
    <html lang="en-US" prefix="og: http://ogp.me/ns#">
        <head>
        <title>
            Kulado
        </title>
    ...
    ```
