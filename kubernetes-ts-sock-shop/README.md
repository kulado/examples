[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Kubernetes Sock Shop

A version of the standard [Sock Shop microservices reference app](https://github.com/microservices-demo/microservices-demo) app using
Kulado and `@kulado/kubernetes`.

## Running the App

Follow the steps in [Kulado Installation and Setup](https://docs.kulado.com/install/) and [Configuring Kulado
Kubernetes](https://docs.kulado.com/reference/kubernetes.html#configuration) to get setup with Kulado and Kubernetes.

Install dependencies:

```sh
npm install
```

Create a new stack:

```sh
$ kulado stack init
Enter a stack name: testing
```

Preview the deployment of the application:

```sh
$ kulado preview
Previewing update of stack 'testing'
Previewing changes:

     Type                        Name               Plan       Info
 +   kulado:kulado:Stack         sock-shop-testing  create
 +   kubernetes:core:Service     carts-db           create
 +   kubernetes:core:Service     carts              create
 +   kubernetes:core:Service     catalog-db         create
 +   kubernetes:core:Service     catalog            create
 +   kubernetes:core:Service     orders-db          create
 +   kubernetes:core:Service     orders             create
 +   kubernetes:core:Service     payment            create
 +   kubernetes:core:Service     rabbitmq           create
 +   kubernetes:core:Service     shipping           create
 +   kubernetes:core:Service     user-db            create
 +   kubernetes:core:Service     user               create
 +   kubernetes:core:Service     front-end          create
 +   kubernetes:core:Service     queue-master       create
 +   kubernetes:apps:Deployment  queue-master       create
 +   kubernetes:apps:Deployment  catalog-db         create
 +   kubernetes:apps:Deployment  catalog            create
 +   kubernetes:apps:Deployment  payment            create
 +   kubernetes:apps:Deployment  rabbitmq           create
 +   kubernetes:apps:Deployment  front-end          create
 +   kubernetes:apps:Deployment  carts-db           create
 +   kubernetes:apps:Deployment  orders-db          create
 +   kubernetes:apps:Deployment  user-db            create
 +   kubernetes:apps:Deployment  user               create
 +   kubernetes:apps:Deployment  carts              create
 +   kubernetes:apps:Deployment  orders             create
 +   kubernetes:apps:Deployment  shipping           create

info: 27 changes previewed:
    + 27 resources to create
```

Perform the deployment:

```sh
$ kulado up
Updating stack 'testing'
Performing changes:

     Type                        Name          Status      Info
 +   kubernetes:core:Service     carts-db      created
 +   kubernetes:core:Service     carts         created
 +   kubernetes:core:Service     catalog-db    created
 +   kubernetes:core:Service     catalog       created
 +   kubernetes:core:Service     orders-db     created
 +   kubernetes:core:Service     orders        created
 +   kubernetes:core:Service     payment       created
 +   kubernetes:core:Service     rabbitmq      created
 +   kubernetes:core:Service     shipping      created
 +   kubernetes:core:Service     user-db       created
 +   kubernetes:core:Service     user          created
 +   kubernetes:core:Service     front-end     created
 +   kubernetes:core:Service     queue-master  created
 +   kubernetes:apps:Deployment  queue-master  created
 +   kubernetes:apps:Deployment  catalog-db    created
 +   kubernetes:apps:Deployment  catalog       created
 +   kubernetes:apps:Deployment  payment       created
 +   kubernetes:apps:Deployment  rabbitmq      created
 +   kubernetes:apps:Deployment  front-end     created
 +   kubernetes:apps:Deployment  carts-db      created
 +   kubernetes:apps:Deployment  orders-db     created
 +   kubernetes:apps:Deployment  user-db       created
 +   kubernetes:apps:Deployment  user          created
 +   kubernetes:apps:Deployment  carts         created
 +   kubernetes:apps:Deployment  orders        created
 +   kubernetes:apps:Deployment  shipping      created

info: 27 changes performed:
    + 27 resources created
Update duration: 3m2.127835854s

Permalink: https://kulado.com/examples/testing/updates/1
```

The application is now deployed.  Use `kubectl` to see the deployed services.

```sh
$ k get services -n sock-shop
NAME           CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
carts          10.47.242.164   <none>        80/TCP         4m
carts-db       10.47.245.60    <none>        27017/TCP      4m
catalogue      10.47.255.170   <none>        80/TCP         4m
catalogue-db   10.47.252.96    <none>        3306/TCP       4m
front-end      10.47.247.63    <nodes>       80:30001/TCP   4m
orders         10.47.255.197   <none>        80/TCP         4m
orders-db      10.47.242.209   <none>        27017/TCP      4m
payment        10.47.254.192   <none>        80/TCP         4m
queue-master   10.47.251.206   <none>        80/TCP         4m
rabbitmq       10.47.254.26    <none>        5672/TCP       4m
shipping       10.47.247.218   <none>        80/TCP         4m
user-db        10.47.242.91    <none>        27017/TCP      4m
user           10.47.242.91    <none>        27017/TCP      4m
```
