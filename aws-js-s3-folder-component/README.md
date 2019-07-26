[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Static Website Hosted on AWS S3

The component version of [aws-js-s3-folder](../aws-js-s3-folder). For a detailed walkthrough of this example, see [Tutorial: Kulado Components](https://kulado.io/reference/component-tutorial.html).

## Deploying and running the program

Note: some values in this example will be different from run to run.  These values are indicated
with `***`.

1.  Create a new stack:

    ```bash
    $ kulado stack init website-component-testing
    ```

1.  Set the AWS region:

    ```
    $ kulado config set aws:region us-west-2
    ```

1.  Restore NPM modules via `npm install` or `yarn install`.

1.  Run `kulado up` to preview and deploy changes.  After the preview is shown you will be
    prompted if you want to continue or not.

    ```bash
    $ kulado up
    Previewing update of stack 'website-component-testing'
    Previewing changes:
    ...

    Updating stack 'website-component-testing'
    Performing changes:

        Type                       Name                                                  Status      Info
    +   kulado:kulado:Stack        aws-js-s3-folder-component-website-component-testing  created
    +   └─ examples:S3Folder       kulado-static-site                                    created
    +      ├─ aws:s3:Bucket        kulado-static-site                                    created
    +      ├─ aws:s3:BucketPolicy  bucketPolicy                                          created
    +      ├─ aws:s3:BucketObject  favicon.png                                           created
    +      └─ aws:s3:BucketObject  index.html                                            created

    ---outputs:---
    info: 6 changes performed:
        + 6 resources created
    Update duration: ***

    Permalink: https://app.kulado.com/***
    ```

1.  To see the resources that were created, run `kulado stack output`:

    ```bash
    $ kulado stack output
    Current stack outputs (2):
        OUTPUT                                           VALUE
        bucketName                                       s3-website-bucket-***
        websiteUrl                                       ***.s3-website-us-west-2.amazonaws.com
    ```

1.  To see that the S3 objects exist, you can either use the AWS Console or the AWS CLI:

    ```bash
    $ aws s3 ls $(kulado stack output bucketName)
    2018-04-17 15:40:47      13731 favicon.png
    2018-04-17 15:40:48        249 index.html
    ```

1.  Open the site URL in a browser to see both the rendered HTML and the favicon:

    ```bash
    $ kulado stack output websiteUrl
    ***.s3-website-us-west-2.amazonaws.com
    ```

1.  To clean up resources, run `kulado destroy` and answer the confirmation question at the prompt.
