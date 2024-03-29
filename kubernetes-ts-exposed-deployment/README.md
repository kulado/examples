[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Kubernetes: Exposing a Deployment with a public IP address

Deploys `nginx` to a Kubernetes cluster, and publicly exposes it to the Internet with an IP address,
using a Kubernetes `Service`.

In the gif below we see the experience of deploying this example with `kulado up`. Notice that
Kulado has an inherent notion of "done-ness" -- Kulado waits for the IP address to be allocated to
the `Service`. Because this example uses the Kulado concept of _stack exports_ to report this IP
address, in this example we are also able to use `curl` to reach the `nginx` server.

![Allocating a public IP to a Deployment](images/deploy.gif "Allocating a public IP to a Deployment")

## Running the App

If you haven't already, follow the steps in [Kulado Installation and
Setup](https://docs.kulado.com/install/) and [Configuring Kulado
Kubernetes](https://docs.kulado.com/reference/kubernetes.html#configuration) to get setup with
Kulado and Kubernetes.

Now, install dependencies:

```sh
npm install
```

Create a new stack:

```sh
$ kulado stack init
Enter a stack name: exposed-deployment-dev
```

This example will attempt to expose the `nginx` deployment Internet with a `Service` of type
`LoadBalancer`. Since minikube does not support `LoadBalancer`, the application already knows to use
type `ClusterIP` instead; all you need to do is to tell it whether you're deploying to minikube:

```sh
kulado config set isMinikube <value>
```

Perform the deployment:

```sh
$ kulado up
Updating stack 'exposed-deployment-dev'
Performing changes:

     Type                           Name                                       Status      Info
 +   kulado:kulado:Stack            exposed-deployment-exposed-deployment-dev  created     1 warning
 +   ├─ kubernetes:apps:Deployment  nginx                                      created
 +   └─ kubernetes:core:Service     nginx                                      created     2 info messages

Diagnostics:
  kubernetes:core:Service: nginx
    info: ✅ Service 'nginx-rn6uipeg' successfully created endpoint objects

    info: ✅ Service has been allocated an IP

---outputs:---
frontendIp: "35.226.79.225"

info: 3 changes performed:
    + 3 resources created
Update duration: 46.555593397s

Permalink: https://app.kulado.com/hausdorff/exposed-deployment-dev/updates/1
```

We can see here in the `---outputs:---` section that Wordpress was allocated a public IP, in this
case `35.226.79.225`. It is exported with a stack output variable, `frontendIp`. We can use `curl`
and `grep` to retrieve the `<title>` of the site the proxy points at.

> _Note_: minikube does not support type `LoadBalancer`; if you are deploying to minikube, make sure
> to run `kubectl port-forward svc/frontend 8080:80` to forward the cluster port to the local
> machine and access the service via `localhost:8080`.

```sh
$ curl -sL $(kulado stack output frontendIp) | grep "<title>"
<title>Welcome to nginx!</title>
```

## Next steps

Now that `nginx` is deployed and exposed to the internet with an IP, try playing around with the
example!

If we change the `nginx` image to `nginx:1.16-alpine`, we can run `kulado preview --diff` and see
this change reported to us:

![Diff](images/diff.gif "Reporting a diff after we change the app")

Notice also that if you provide an image that does not exist, Kulado will report errors as it sees
them. You should see something similar in principle to this:

![Diff](images/error.gif "Error reporting")
