[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# AWS EC2 Web Server

This example deploys a simple AWS EC2 virtual machine running a Python web server.

## Deploying the App

To deploy your infrastructure, follow the below steps.

### Prerequisites

1. [Install Kulado](https://kulado.io/install)
2. [Configure AWS Credentials](https://kulado.io/install/aws.html)

### Steps

After cloning this repo, from this working directory, run these commands:

1. Create a new stack, which is an isolated deployment target for this example:

    ```bash
    $ kulado stack init
    ```

2. Set the required configuration variables for this program:

    ```bash
    $ kulado config set aws:region us-east-1
    ```

3. Stand up the VM, which will also boot up your Python web server on port 80:

    ```bash
    $ kulado up
    ```

4. After a couple minutes, your VM will be ready, and two stack outputs are printed:

    ```bash
    $ kulado stack output
    Current stack outputs (2):
    OUTPUT          VALUE
    publicIp        53.40.227.82
    ```

5. Thanks to the security group making port 80 accessible to the 0.0.0.0/0 CIDR block, we can curl it:

    ```bash
    $ curl $(kulado stack output publicIp)
    Hello, World!
    ```

6. From there, feel free to experiment. Simply making edits and running `kulado up` will incrementally update your VM.

7. Afterwards, destroy your stack and remove it:

    ```bash
    $ kulado destroy --yes
    $ kulado stack rm --yes
    ```
