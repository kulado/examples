[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Serverless REST API on AWS

A simple REST API that counts the number of times a route has been hit.

## Deploying and running the program

Note: some values in this example will be different from run to run.  These values are indicated
with `***`.

1.  Create a new stack:

    ```bash
    $ kulado stack init count-api-testing
    ```

1.  Set the provider and region for AWS:

    ```
    $ kulado config set cloud:provider aws
    $ kulado config set aws:region us-west-2
    ```

1.  Restore NPM modules via `npm install` or `yarn install`.

1.  Run `kulado up` to preview and deploy changes:

    ```
    $ kulado up
    Previewing update of stack 'count-api-testing'
    ...

    Updating stack 'count-api-testing'
    Performing changes:

        Type                                      Name                                 Status      Info
    +   kulado:kulado:Stack                       cloud-js-httpserver-routecount-luke  created
    +   ├─ cloud:httpserver:HttpServer            routecount                           created
    +   │  ├─ cloud:function:Function             routecount                           created
    +   │  │  └─ aws:serverless:Function          routecount                           created
    +   │  │     ├─ aws:iam:Role                  routecount                           created
    +   │  │     ├─ aws:iam:RolePolicyAttachment  routecount-fd1a00e5                  created
    +   │  │     ├─ aws:iam:RolePolicyAttachment  routecount-32be53a2                  created
    +   │  │     └─ aws:lambda:Function           routecount                           created
    +   │  ├─ aws:apigateway:RestApi              routecount                           created
    +   │  ├─ aws:apigateway:Deployment           routecount                           created
    +   │  ├─ aws:apigateway:Stage                routecount                           created
    +   │  ├─ aws:lambda:Permission               routecount-b9de55a3                  created
    +   │  └─ aws:lambda:Permission               routecount-e1615237                  created
    +   └─ cloud:table:Table                      counterTable                         created
    +      └─ aws:dynamodb:Table                  counterTable                         created

        ---outputs:---
        endpoint: "https://zxvi8hpmak.execute-api.us-west-2.amazonaws.com/stage/"

    info: 15 changes performed:
        + 15 resources created
    Update duration: 32.322463714s
    ```

1.  View the endpoint URL and curl a few routes:

    ```bash
    $ kulado stack output
    Current stack outputs (1):
        OUTPUT            VALUE
        endpoint          https://***.us-west-2.amazonaws.com/stage/

    $ curl $(kulado stack output endpoint)/hello
    {"route":"/hello","count":1}
    $ curl $(kulado stack output endpoint)/hello
    {"route":"/hello","count":2}
    $ curl $(kulado stack output endpoint)/woohoo
    {"route":"/woohoo","count":1}
    ```

1.  To view the runtime logs of the Lambda function, use the `kulado logs` command. To get a log stream, use `kulado logs --follow`.

## Clean up

1.  Run `kulado destroy` to tear down all resources.

1.  To delete the stack itself, run `kulado stack rm`. Note that this command deletes all deployment history from the Kulado Console.
