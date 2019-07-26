[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Multiple Azure Kubernetes Service (AKS) Clusters

This example demonstrates creating multiple Azure Kubernetes Service (AKS) clusters in different regions and with
different node counts. Please see https://docs.microsoft.com/en-us/azure/aks/ for more information about AKS.

# Prerequisites

Ensure you have [downloaded and installed the Kulado CLI](https://kulado.io/install).

We will be deploying to Azure, so you will need an Azure account. If you don't have an account,
[sign up for free here](https://azure.microsoft.com/en-us/free/).
[Follow the instructions here](https://kulado.io/install/azure.html) to connect Kulado to your Azure account.

# Running the Example

> **Note**: Due to an issue in the Azure Terraform Provider (https://github.com/terraform-providers/terraform-provider-azurerm/issues/1635) the
> creation of an Azure Service Principal, which is needed to create the Kubernetes cluster (see index.ts), is delayed and may not
> be available when the cluster is created.  If you get a Service Principal not found error, as a work around, you should be able to run `kulado up`
> again, at which time the Service Principal should have been created.

After cloning this repo, `cd` into it and run these commands.

1. Create a new stack, which is an isolated deployment target for this example:

    ```bash
    $ kulado stack init
    ```

2. Set the required configuration variables for this program:

    ```bash
    $ kulado config set azure:environment public
    $ kulado config set password --secret [your-cluster-password-here]
    $ ssh-keygen -t rsa -f key.rsa
    $ kulado config set sshPublicKey < key.rsa.pub
    ```

3. Deploy everything with the `kulado up` command. This provisions all the Azure resources necessary, including
   an Active Directory service principal and AKS clusters:

    ```bash
    $ kulado up
    ```

4. After a couple minutes, your AKS clusters will be ready. The AKS cluster names will be printed as output variables
   once `kulado up` completes.

    ```bash
    $ kulado up
    ...

    Outputs:
      + aksClusterNames: [
      +     [0]: "akscluster-east513be264"
      +     [1]: "akscluster-westece285c7"
        ]
    ...
    ```

5. At this point, you have multiple AKS clusters running in different regions. Feel free to modify your program, and
   run `kulado up` to redeploy changes. The Kulado CLI automatically detects what has changed and makes the minimal
   edits necessary to accomplish these changes.

6. Once you are done, you can destroy all of the resources, and the stack:

    ```bash
    $ kulado destroy
    $ kulado stack rm
    ```
