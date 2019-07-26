[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# AWS RDS and Airflow example

A Kulado program to deploy an RDS Postgres instance and containerized Airflow.

## Deploying and running the program

For more information on how to run this example, see: https://kulado.io/reference and https://kulado.io/quickstart/

1. Create a new stack:

   ```bash
   $ kulado stack init airflow
   ```

1. Set the AWS region:

    ```
    $ kulado config set aws:region us-east-1
    ```

1. Set the desired RDS password with:

    ```
    $ kulado config set airflow:dbPassword DESIREDPASSWORD
    ```

1. Restore NPM modules via `yarn install`.
1. Run `kulado up` to preview and deploy changes.  After the preview is shown you will be
   prompted if you want to continue or not.

```
Previewing update of stack 'airflow'
Previewing changes:

     Type                                           Name                              Plan       Info
 +   kulado:kulado:Stack                            airflow                           create
...
```

