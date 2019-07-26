[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Kulado DigitalOcean Droplets

Starting point for building a Kulado sample architecture on DigitalOcean.

## Running the App

1.  Create a new stack:

    ```
    $ kulado stack init digitalocean-ts-loadbalanced-droplets
    ```

1.  Configure the project:

    ```
    $ kulado config set --secret digitalocean:token YOURDIGITALOCEANTOKEN
    ```

1.  Restore NPM dependencies:

    ```
    $ npm install
    ```

1.  Run `kulado up` to preview and deploy changes:

    ``` 
    $ kulado up
    Previewing update (digitalocean-ts-loadbalanced-droplets):
    ...

Updating (digitalocean-ts-loadbalanced-droplets):

     Type                                Name                                                                         Status
 +   kulado:kulado:Stack                 digitalocean-ts-loadbalanced-droplets-digitalocean-ts-loadbalanced-droplets  created
 +   ├─ digitalocean:index:Tag           demo-app                                                                     created
 +   ├─ digitalocean:index:Tag           web-2                                                                        created
 +   ├─ digitalocean:index:Tag           web-0                                                                        created
 +   ├─ digitalocean:index:Tag           web-1                                                                        created
 +   ├─ digitalocean:index:LoadBalancer  public                                                                       created
 +   ├─ digitalocean:index:Droplet       web-0                                                                        created
 +   ├─ digitalocean:index:Droplet       web-2                                                                        created
 +   └─ digitalocean:index:Droplet       web-1                                                                        created

Outputs:
    endpoint: "138.197.62.183"

Resources:
    + 9 created

Duration: 3m2s
    ```

1.  Curl the HTTP server:

    ```
    curl "$(kulado stack output endpoint)"
    ```

1. Cleanup

    ```
    $ kulado destroy
    $ kulado stack rm
    ```
