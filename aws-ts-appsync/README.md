[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Defining an AWS AppSync Endpoint

This example shows how to setup a basic GraphQL endpoint in AWS AppSync. The endpoint contains one query and one mutation that get and put items to a Dynamo DB table.

## Deploying and running the Kulado App

1.  Create a new stack:

    ```bash
    $ kulado stack init dev
    ```

1.  Set the AWS region:

    ```
    $ kulado config set aws:region us-east-2
    ```

1.  Restore NPM modules via `npm install` or `yarn install`.

1.  Run `kulado up` to preview and deploy changes:

    ``` 
    $ kulado up
    Previewing update (dev):
    ...

    Updating (dev):
    ...
    Resources:
        + 10 created
    Duration: 20s
    ```

1.  Check the deployed GraphQL endpoint:

    ```
    $ kulado stack output endpoint
    https://***.appsync-api.us-east-2.amazonaws.com/graphql
    $ kulado stack output key
    ***sensitivekey***
    $ curl -XPOST -H "Content-Type:application/graphql" -H "x-api-key:$(kulado stack output key)" -d '{ "query": "mutation AddTenant { addTenant(id: \"123\", name: \"FirstCorp\") { id name } }" }' "$(kulado stack output endpoint)" 
    {
        "data": {
            "addTenant": {
                "id": "123",
                "name": "FirstCorp"
            }
        }
    }
    ```

## Clean up

1.  Run `kulado destroy` to tear down all resources.

1.  To delete the stack itself, run `kulado stack rm`. Note that this command deletes all deployment history from the Kulado Console.
