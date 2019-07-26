[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Azure Web Server Virtual Machine Component

This example provisions a configurable number of Linux web servers in an Azure Virtual Machine, and returns the
resulting public IP addresses. This example uses a reusable [Kulado component](
https://kulado.io/reference/programming-model/#components) to simplify the creation of new virtual machines. By
defining a `WebServer` class, we can hide many details (see [here](./webserver.ts) for its definition).

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Download and install the Kulado CLI](https://kulado.io/install)
- [Connect Kulado with your Azure account](https://kulado.io/quickstart/azure/setup.html) (if your `az` CLI is
      configured, this will just work)

## Running the App

1.  Create a new stack:

    ```
    $ kulado stack init dev
    ```

1.  Configure the deployment. The username and password here will be used to configure the Virtual Machine. The
    password must adhere to the [Azure restrictions on VM passwords](
    https://docs.microsoft.com/en-us/azure/virtual-machines/windows/faq#what-are-the-password-requirements-when-creating-a-vm).

    ```
    $ kulado config set azure:location westus  # any valid Azure region will do
    $ kulado config set username webmaster
    $ kulado config set password <your-password> --secret
    $ kulado config set count 5                # optional -- will default to 2 if left out
    ```

    Note that `--secret` ensures your password is encrypted safely.

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
    info: 15 changes performed:
        + 15 resources created
    Update duration: 4m27s
    ```

1.  Check the resulting IP addresses:

    ```
    $ kulado stack output ipAddresses
    [ 40.112.181.239, ..., 40.112.181.240 ]
    ```
