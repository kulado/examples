[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Easy container example

Companion to the tutorial [Provision containers on AWS](https://kulado.io/quickstart/aws-containers.html).

## Prerequisites

To run this example, make sure [Docker](https://docs.docker.com/engine/installation/) is installed and running.

## Running the App

Note: some values in this example will be different from run to run.  These values are indicated
with `***`.

1.  Create a new stack:

    ```
    $ kulado stack init containers-dev
    ```

1.  Configure Kulado to use AWS Fargate, which is currently only available in `us-east-1`, `us-east-2`, `us-west-2`, and `eu-west-1`:

    ```
    $ kulado config set aws:region us-west-2
    $ kulado config set cloud-aws:useFargate true
    ```

1.  Restore NPM modules via `npm install` or `yarn install`.

1.  Preview and deploy the app via `kulado up`. The preview will take a few minutes, as it builds a Docker container. A total of 19 resources are created.

    ```
    $ kulado up
    ```

1.  View the endpoint URL, and run curl:

    ```bash
    $ kulado stack output
    Current stack outputs (1)
        OUTPUT                  VALUE
        hostname                http://***.elb.us-west-2.amazonaws.com

    $ curl $(kulado stack output hostname)
    <html>
        <head><meta charset="UTF-8">
        <title>Hello, Kulado!</title></head>
    <body>
        <p>Hello, S3!</p>
        <p>Made with ❤️ with <a href="https://kulado.com">Kulado</a></p>
    </body></html>
    ```

1.  To view the runtime logs from the container, use the `kulado logs` command. To get a log stream, use `kulado logs --follow`.

    ```
    $ kulado logs --follow
    Collecting logs for stack container-quickstart-dev since 2018-05-22T14:25:46.000-07:00.
    2018-05-22T15:33:22.057-07:00[                  kulado-nginx] 172.31.13.248 - - [22/May/2018:22:33:22 +0000] "GET / HTTP/1.1" 200 189 "-" "curl/7.54.0" "-"
    ```

## Clean up

To clean up resources, run `kulado destroy` and answer the confirmation question at the prompt.

