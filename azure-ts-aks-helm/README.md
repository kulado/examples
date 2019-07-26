[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Azure Kubernetes Service (AKS) Cluster and Helm Chart

This example demonstrates creating an Azure Kubernetes Service (AKS) Cluster, and deploying a Helm Chart into it,
all in one Kulado program. Please see https://docs.microsoft.com/en-us/azure/aks/ for more information about AKS.

# Prerequisites

Ensure you have [downloaded and installed the Kulado CLI](https://kulado.io/install).

We will be deploying to Azure, so you will need an Azure account. If you don't have an account,
[sign up for free here](https://azure.microsoft.com/en-us/free/).
[Follow the instructions here](https://kulado.io/install/azure.html) to connect Kulado to your Azure account.

This example deploys a Helm Chart from [Bitnami's Helm chart repository](https://github.com/bitnami/charts), so you
will need to [install the Helm CLI](https://docs.helm.sh/using_helm/#installing-helm) and configure it:

```bash
$ helm init --client-only
$ helm repo add bitnami https://charts.bitnami.com/bitnami
```

# Running the Example

After cloning this repo, `cd` into it and run these commands. A Kubernetes cluster and Apache web server will appear!

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
   an Active Directory service principal, AKS cluster, and then deploys the Apache Helm Chart, all in a single gesture:

    ```bash
    $ kulado up
    ```

4. After a couple minutes, your cluster and Apache server will be ready. Three output variables will be printed,
   reflecting your cluster name (`cluster`), Kubernetes config (`kubeConfig`) and server IP address (`serviceIP`).

   Using these output variables, you may `curl` your Apache server's `serviceIP`:

   ```bash
   $ curl $(kulado stack output serviceIP)
   <html><body><h1>It works!</h1></body></html>
   ```

   And you may also configure your `kubectl` client using the `kubeConfig` configuration:

   ```bash
   $ kulado stack output kubeConfig > kubeconfig.yaml
   $ KUBECONFIG=./kubeconfig.yaml kubectl get service
   NAME            TYPE           CLUSTER-IP     EXTERNAL-IP    PORT(S)                      AGE
   apache-apache   LoadBalancer   10.0.125.196   40.76.52.208   80:32080/TCP,443:31419/TCP   9m
   kubernetes      ClusterIP      10.0.0.1       <none>         443/TCP                      13h
   ```

5. At this point, you have a running cluster. Feel free to modify your program, and run `kulado up` to redeploy changes.
   The Kulado CLI automatically detects what has changed and makes the minimal edits necessary to accomplish these
   changes. This could be altering the existing chart, adding new Azure or Kubernetes resources, or anything, really.

6. Once you are done, you can destroy all of the resources, and the stack:

    ```bash
    $ kulado destroy
    $ kulado stack rm
    ```
