[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# GCP Functions

An example of deploying an HTTP Google Cloud Function endpoint using TypeScript.

## Prerequisites

0. [Ensure you have the latest Node.js and NPM](https://nodejs.org/en/download/)
2. [Install the Kulado CLI](https://kulado.io/quickstart/install.html)
3. [Configure Kulado to access your GCP account](https://kulado.io/quickstart/gcp/setup.html)

## Running the App

1.  Restore NPM dependencies:

    ```
    $ npm install
    ```

2.  Create a new stack:

    ```
    $ kulado stack init gcp-fn
    ```

3.  Configure your GCP project and region:

    ```
    $ kulado config set gcp:project <projectname> 
    $ kulado config set gcp:region <region>
    ```

4.  Run `kulado up` to preview and deploy changes:

    ``` 
    $ kulado up
    Previewing changes:
    ...

    Performing changes:
    ...
    info: 6 changes performed:
        + 6 resources created
    Update duration: 39.65130324s
    ```

5.  Check the deployed function endpoint:

    ```
    $ kulado stack output url
    https://us-central1-kulado-development.cloudfunctions.net/greeting-function-7f95447
    $ curl "$(kulado stack output url)"
    Greetings from Google Cloud Functions!
    ```

6. Clean up your GCP and Kulado resources:

    ```
    $ kulado destroy
    ...
    $ kulado stack rm
    ...
    ```
