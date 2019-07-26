[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Azure App Service running Docker containers on Linux

Starting point for building web application hosted in Azure App Service from Docker images.

The example shows two scenarios:

- Deploying an existing image from Docker Hub
- Deploying a new custom registry in Azure Container Registry, building a custom Docker image, and running the image from the custom registry

## Running the App

1.  Create a new stack:

    ```
    $ kulado stack init azure-appservice-docker
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
        + 7 created

    Duration: 4m56s
    ```

1.  Check the deployed endpoints:

    ```
    $ kulado stack output helloEndpoint
    http://hello-app91dfea21.azurewebsites.net/hello
    $ curl "$(kulado stack output helloEndpoint)"
    Hello, world!

    $ kulado stack output getStartedEndpoint
    http://get-started15da1348.azurewebsites.net
    $ curl "$(kulado stack output getStartedEndpoint)"
    <!DOCTYPE html>
    <html>
      <head>
        <title>Azure App Service</title>
    ...
    ```
