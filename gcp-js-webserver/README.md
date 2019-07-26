[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Kulado web server (GCP)

Starting point for building the Kulado web server sample in Google Cloud.

## Running the App

1.  Create a new stack:

    ```
    $ kulado stack init webserver-gcp-testing
    ```

1.  Configure the project:

    ```
    $ kulado config set gcp:project YOURGOOGLECLOUDPROJECT
    $ kulado config set gcp:zone us-central1-a
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

        Type                     Name                                 Status      Info
    +   kulado:kulado:Stack      webserver-gcp-webserver-gcp-testing  created
    +   ├─ gcp:compute:Network   network                              created
    +   ├─ gcp:compute:Firewall  firewall                             created
    +   └─ gcp:compute:Instance  instance                             created

    ---outputs:---
    instanceIP  : "35.224.37.178"
    instanceName: "instance-8ad9bd8"

    info: 4 changes performed:
        + 4 resources created
    Update duration: 57.918455655s
    ```

1.  Curl the HTTP server:

    ```
    $ curl $(kulado stack output instanceIP)
    Hello, World!
    ```

1.  SSH into the server:

    ```
    $ gcloud compute ssh $(kulado stack output instanceName)
    Warning: Permanently added 'compute.967481934451185713' (ECDSA) to the list of known hosts.

    The programs included with the Debian GNU/Linux system are free software;
    the exact distribution terms for each program are described in the
    individual files in /usr/share/doc/*/copyright.

    Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
    permitted by applicable law.
    luke@instance-8ad9bd8:~$
    ```

1. Cleanup

    ```
    $ kulado destroy
    $ kulado stack rm
    ```
