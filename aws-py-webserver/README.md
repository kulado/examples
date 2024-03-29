[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# AWS Web Server example in Python

An example based on the Amazon sample at:
http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/deploying.applications.html. The example deploys an EC2 instance and opens port 80. 

To get the correct Amazon Linux AMI for the instance size and region, a mapping is defined in [ami.py](./ami.py).

## Prerequisites

1. [Install Kulado](https://kulado.io/install/)
1. [Configure Kulado for AWS](https://kulado.io/quickstart/aws/setup.html)
1. [Configure Kulado for Python](https://kulado.io/reference/python.html)

## Deploying and running the program

1. Install dependencies (a `virtualenv` is recommended - see [Kulado Python docs](https://kulado.io/reference/python.html)):

    ```
    $ pip install -r requirements.txt
    ```

1.  Create a new stack:

    ```
    $ kulado stack init python-webserver-testing
    ```

1.  Set the AWS region:

    ```
    $ kulado config set aws:region us-west-2
    ```

1.  Run `kulado up` to preview and deploy changes:

    ```
    $ kulado up
    Previewing stack 'python-webserver-testing'
    Previewing changes:
    ...

    Do you want to proceed? yes
    Updating stack 'python-webserver-testing'
    Performing changes:

    #: Resource Type          Name                                   Status     Extra Info
    1: kulado:kulado:Stack    webserver-py-python-webserver-testing  + created  
    2: aws:ec2:SecurityGroup  web-secgrp                             + created  
    3: aws:ec2:Instance       web-server-www                         + created  
    
    info: 3 changes performed:
        + 3 resources created
    Update duration: 26.470339302s

    Permalink: https://kulado.com/lindydonna/examples/webserver-py/python-webserver-testing/updates/1
    ```

1.  View the host name and IP address of the instance via `stack output`:

    ```
    $ kulado stack output
    Current stack outputs (2):
        OUTPUT                                           VALUE
        public_dns                                       ec2-34-217-176-141.us-west-2.compute.amazonaws.com
        public_ip                                        34.217.176.141
    ```    

1.  Verify that the EC2 instance exists, by either using the AWS Console or running `aws ec2 describe-instances`.

## Clean up

To clean up resources, run `kulado destroy` and answer the confirmation question at the prompt.
