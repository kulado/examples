[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Azure Functions

An example Kulado program that deploys a TypeScript function to Azure Functions.

## Running the App

1.  Create a new stack:

    ```
    $ kulado stack init azure-fn
    ```

1.  Login to Azure CLI (you will be prompted to do this during deployment if you forget this step):

    ```
    $ az login
    ```

1.  Restore NPM dependencies:

    ```
    $ npm install
    ```

1.  Configure the location to deploy the example to:

    ```
    $ kulado config set azure:location <location>
    ```

1.  Run `kulado up` to preview and deploy changes:

    ``` 
    $ kulado up
    Previewing changes:
    ...

    Performing changes:
    ...
    info: 9 changes performed:
        + 9 resources created
    Update duration: 1m20.493392283s
    ```

1.  Check the deployed function endpoint:

    ```
    $ kulado stack output endpoint
    https://fn-app051a4f8b.azurewebsites.net/api/fn
    $ curl "$(kulado stack output endpoint)"
    Greetings from Azure Functions!
    ...
    ```
