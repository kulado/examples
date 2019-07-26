[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Static Website Hosted on AWS S3 in Go

A static website that uses [S3's website support](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html).
For a detailed walkthrough of this example, see the tutorial [Static Website on AWS S3](https://kulado.io/quickstart/aws-s3-website.html).

## Deploying and running the program

1.  Create a new stack:

    ```bash
    $ kulado stack init website-testing
    ```

1. Install the Kulado AWS plugin:

    ```
    $ kulado plugin install resource aws 0.18.3
    ```

1.  Set the AWS region:

    ```
    $ kulado config set aws:region us-west-2
    ```

1.  Compile the Go program and ensure it's on your path (such as with `$GOPATH`):

    ```
    $ go get .
    $ go install .
    ```

1.  Run `kulado up` to preview and deploy changes.

    ```bash
    $ kulado up
    Previewing stack 'website-testing'
    Previewing changes:
    ...

    Performing changes:

    #: Resource Type        Name                              Status     Extra Inf
    1: kulado:kulado:Stack  aws-js-s3-folder-website-testing  + created  
    2: aws:s3:Bucket        s3-website-bucket                 + created  
    3: aws:s3:BucketPolicy  bucketPolicy                      + created  
    4: aws:s3:BucketObject  favicon.png                       + created  
    5: aws:s3:BucketObject  index.html                        + created  

    info: 5 changes performed:
        + 5 resources created
    Update duration: 8.827698762s

    Permalink: https://kulado.com/lindydonna/examples/aws-js-s3-folder/website-testing/updates/1
    ```

1.  To see the resources that were created, run `kulado stack`:

    ```bash
    $ kulado stack
    Current stack is go-website-testing:
        Managed by https://api.kulado.com
        Owner: swgillespie
        Last updated: 13 minutes ago (2018-06-15 14:19:06.856631155 -0700 PDT)
        Kulado version: v0.14.0-rc1
        Plugin go [language] version: 0.14.0-rc1
        Plugin aws [resource] version: 0.14.0-rc1

    Current stack resources (5):
        TYPE                                             NAME
        kulado:kulado:Stack                              aws-go-s3-folder-go-website-testing
        aws:s3/bucket:Bucket                             s3-website-bucket
        aws:s3/bucketPolicy:BucketPolicy                 bucketPolicy
        aws:s3/bucketObject:BucketObject                 www/index.html
        aws:s3/bucketObject:BucketObject                 www/favicon.png
    ```

1.  To clean up resources, run `kulado destroy` and answer the confirmation question at the prompt.
