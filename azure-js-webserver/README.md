[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Kulado web server (Azure)

Starting point for building the Kulado web server sample in Azure.

## Running the App

1.  Create a new stack:

    ```
    $ kulado stack init webserver-azure-testing
    ```

1.  Configure the app deployment.  The username and password here will be used to configure the Virtual Machine.  The
password must adhere to the [Azure restrictions on VM
passwords](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/faq#what-are-the-password-requirements-when-creating-a-vm).

    ```
    $ kulado config set azure:environment public
    $ kulado config set username testuser
    $ kulado config set --secret password <yourpassword>
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
    info: 7 changes performed:
        + 7 resources created
    Update duration: 2m38.391208237s
    ```

1.  Check the IP address:

    ```
    $ kulado stack output publicIP
    40.112.181.239
    ```

