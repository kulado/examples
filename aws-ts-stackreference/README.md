[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# StackReference Example

This example creates a "team" EC2 Instance with tags set from _upstream_ "company" and "department" 
stacks via [StackReference](https://kulado.io/reference/organizing-stacks-projects.html#inter-stack-dependencies).

```
/**
 *   company
 *   └─ department
 *      └─ team
 */
```

## Getting Started

1. Change directory to `company` and install dependencies.

    ```bash
    $ cd company
    $ npm install
    ````

1. Create a new stack:

    ```bash
    $ kulado stack init dev
    ```

1. Set the required configuration variables:

    ```bash
    $ kulado config set companyName 'ACME Widget Co.'
    ```

1. Deploy everything with the `kulado up` command. 

    ```bash
    $ kulado up
    Previewing update (dev):

        Type                 Name                               Plan
    +   kulado:kulado:Stack  aws-ts-stackreference-company-dev  create

    Resources:
        + 1 to create

    Do you want to perform this update? yes
    Updating (dev):

        Type                 Name                               Status
    +   kulado:kulado:Stack  aws-ts-stackreference-company-dev  created

    Outputs:
        companyName: "ACME Widget Company"

    Resources:
        + 1 created

    Duration: 1s

    Permalink: https://app.kulado.com/clstokes/aws-ts-stackreference-company/dev/updates/1
    ```

1. Change directory to `department` and install dependencies.

    ```bash
    $ cd ../company
    $ npm install
    ````

1. Create a new stack:

    ```bash
    $ kulado stack init dev
    ```

1. Set the required configuration variables:

    ```bash
    $ kulado config set departmentName 'E-Commerce'
    ```

1. Deploy everything with the `kulado up` command. 

    ```bash
    $ kulado up
    Previewing update (dev):

        Type                 Name                                  Plan
    +   kulado:kulado:Stack  aws-ts-stackreference-department-dev  create

    Resources:
        + 1 to create

    Do you want to perform this update? yes
    Updating (dev):

        Type                 Name                                  Status
    +   kulado:kulado:Stack  aws-ts-stackreference-department-dev  created

    Outputs:
        departmentName: "E-Commerce"

    Resources:
        + 1 created

    Duration: 1s

    Permalink: https://app.kulado.com/clstokes/aws-ts-stackreference-department/dev/updates/1
    ```

1. Change directory to `team` and install dependencies.

    ```bash
    $ cd ../team
    $ npm install
    ````

1. Create a new stack:

    ```bash
    $ kulado stack init dev
    ```

1. Set the required configuration variables, replacing `YOUR_ORG` with the name of your Kulado organization:

    ```bash
    $ kulado config set companyStack YOUR_ORG/aws-ts-stackreference-company/dev
    $ kulado config set departmentStack YOUR_ORG/aws-ts-stackreference-department/dev
    $ kulado config set teamName 'Frontend Dev'
    $ kulado config set aws:region us-west-2 # any valid AWS zone works
    ```

1. Deploy everything with the `kulado up` command. 

    ```bash
    $ envchain aws kulado up
    Previewing update (dev):

        Type                             Name                                           Plan
    +   kulado:kulado:Stack              aws-ts-stackreference-team-dev                 create
    >-  ├─ kulado:kulado:StackReference  clstokes/aws-ts-stackreference-department/dev  read
    >-  ├─ kulado:kulado:StackReference  clstokes/aws-ts-stackreference-company/dev     read
    +   └─ aws:ec2:Instance              tagged                                         create

    Resources:
        + 2 to create

    Do you want to perform this update? yes
    Updating (dev):

        Type                             Name                                           Status
    +   kulado:kulado:Stack              aws-ts-stackreference-team-dev                 created
    >-  ├─ kulado:kulado:StackReference  clstokes/aws-ts-stackreference-company/dev     read
    >-  ├─ kulado:kulado:StackReference  clstokes/aws-ts-stackreference-department/dev  read
    +   └─ aws:ec2:Instance              tagged                                         created

    Outputs:
        instanceId  : "i-0a9ede9c446503903"
        instanceTags: {
            Managed By: "Kulado"
            company   : "ACME Widget Company"
            department: "E-Commerce"
            team      : "Frontend Dev"
        }

    Resources:
        + 2 created

    Duration: 28s

    Permalink: https://app.kulado.com/clstokes/aws-ts-stackreference-team/dev/updates/1
    ```


## Clean Up

1. Once you are done, destroy all of the resources and the stack. Repeat this in each 
of the `company`, `department`, and `team` directories from above that you ran `kulado up` within.

    ```bash
    $ kulado destroy
    $ kulado stack rm
    ```
