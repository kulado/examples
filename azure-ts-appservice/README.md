[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Azure App Service with SQL Database and Application Insights

Starting point for building web application hosted in Azure App Service.

Provisions Azure SQL Database and Azure Application Insights to be used in combination
with App Service.

## Running the App

1.  Create a new stack:

    ```
    $ kulado stack init azure-appservice
    ```

1.  Login to Azure CLI (you will be prompted to do this during deployment if you forget this step):

    ```
    $ az login
    ```

1.  Restore NPM dependencies:

    ```
    $ npm install
    ```

1. Define SQL Server password (make it complex enough to satisfy Azure policy):

    ```
    kulado config set --secret sqlPassword <value>
    ```

1.  Run `kulado up` to preview and deploy changes:

    ``` 
    $ kulado up
    Previewing changes:
    ...

    Performing changes:
    ...
    info: 10 changes performed:
        + 10 resources created
    Update duration: 1m14.59910109s
    ```

1.  Check the deployed website endpoint:

    ```
    $ kulado stack output endpoint
    https://azkulado-as0ef47193.azurewebsites.net
    $ curl "$(kulado stack output endpoint)"
    <html>
        <body>
            <h1>Greetings from Azure App Service!</h1>
        </body>
    </html>
    ```
