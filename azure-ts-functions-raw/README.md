[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Azure Functions

Azure Functions created from raw deployment packages in all supported languages.

.NET and Java are precompiled languages, and the deployment artifact contains compiled binaries. You will need the following tools to build these projects:

- [.NET Core SDK](https://dotnet.microsoft.com/download) for the .NET Function App
- [Apache Maven](https://maven.apache.org/) for the Java Function App

Please remove the corresponding resources from the program in case you don't need those runtimes.

Known issue: [#2784](https://github.com/kulado/kulado/issues/2784)&mdash;Python deployment package gets corrupted if deployed from Windows. Workaround: deploy from WSL (Windows Subsystem for Linux), Mac OS, or Linux.

## Running the App

1.  Build and publish the .NET Function App project:

    ```
    $ dotnet publish dotnet
    ```

1.  Build and publish the Java Function App project:

    ```
    $ mvn clean package -f java
    ```

1.  Create a new stack:

    ```
    $ kulado stack init dev
    ```

1.  Login to Azure CLI (you will be prompted to do this during deployment if you forget this step):

    ```
    $ az login
    ```

1.  Restore NPM dependencies:

    ```
    $ npm install
    ```

1.  Configure the location to deploy the resources to:

    ```
    $ kulado config set azure:location <location>
    ```

1.  Run `kulado up` to preview and deploy changes:

    ```
    $ kulado up
    Previewing update (dev):
    ...

    Updating (dev):
    ...
    Resources:
        + 33 created
    Duration: 2m42s
    ```

1.  Check the deployed function endpoints:

    ```
    $ kulado stack output dotnetEndpoint
    https://http-dotnet1a2d3e4d.azurewebsites.net/api/HelloDotnet?name=Kulado
    $ curl "$(kulado stack output dotnetEndpoint)"
    Hello from .NET, Kulado
    ```
