[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Kulado web server (Linode)

Starting point for building a Kulado sample webserver on Linode.

## Running the App

1.  Create a new stack:

    ```
    $ kulado stack init webserver-linode-testing
    ```

1.  Configure the project:

    ```
    $ kulado config set --secret linode:token YOURLINODETOKEN
    ```

1.  Restore NPM dependencies:

    ```
    $ npm install
    ```

1.  Run `kulado up` to preview and deploy changes:

    ``` 
    $ kulado up
    Previewing update (webserver-linode-testing):
    ...

    Updating (webserver-linode-testing):

        Type                         Name                                        Status
    +   kulado:kulado:Stack          webserver-linode-webserver-linode-testing   created
    +   ├─ linode:index:StackScript  simple-server                               created
    +   └─ linode:index:Instance     instance                                    created

    Outputs:
        instanceIP   : "69.164.221.90"
        instanceLabel: "linode13879908"

    Resources:
        + 3 created

    Duration: 55s
    ```

1.  Curl the HTTP server:

    ```
    $ curl $(kulado stack output instanceIP)
    Hello, World!
    ```

1.  SSH into the server:

    ```
    $ linode-cli ssh root@$(kulado stack output instanceLabel)
    Warning: Permanently added '69.164.221.90' (ECDSA) to the list of known hosts.
    Linux li136-90 4.9.0-9-amd64 #1 SMP Debian 4.9.168-1 (2019-04-12) x86_64

    The programs included with the Debian GNU/Linux system are free software;
    the exact distribution terms for each program are described in the
    individual files in /usr/share/doc/*/copyright.

    Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
    permitted by applicable law.
    root@li136-90:~#
    ```

1. Cleanup

    ```
    $ kulado destroy
    $ kulado stack rm
    ```
