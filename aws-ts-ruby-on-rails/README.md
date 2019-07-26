[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# AWS EC2 Ruby on Rails

This is a conversion of the AWS CloudFormation Application Framework template for a basic Ruby on Rails server.
It creates a single EC2 virtual machine instance and uses a local MySQL database for storage. Sourced from
https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/sample-templates-appframeworks-us-west-2.html.

## Deploying the App

To deploy your Ruby on Rails application, follow the below steps.

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
    $ kulado config set dbUser [your-mysql-user-here]
    $ kulado config set dbPassword [your-mysql-password-here] --secret
    $ kulado config set dbRootPassword [your-mysql-root-password-here] --secret
    ```

3. Stand up the VM, which will also install and configure Ruby on Rails and MySQL:

    ```bash
    $ kulado up
    ```

4. After several minutes, your VM will be ready, and two stack outputs are printed:

    ```bash
    $ kulado stack output
    Current stack outputs (2):
    OUTPUT          VALUE
    vmIP            53.40.227.82
    websiteURL      http://ec2-53-40-227-82.us-west-2.compute.amazonaws.com/notes
    ```

5. Visit your new website by entering the websiteURL into your browser, or running:

    ```bash
    $ curl $(kulado stack output websiteURL)
    ```

6. From there, feel free to experiment. Simply making edits and running `kulado up` will incrementally update your VM.

7. Afterwards, destroy your stack and remove it:

    ```bash
    $ kulado destroy --yes
    $ kulado stack rm --yes
    ```
