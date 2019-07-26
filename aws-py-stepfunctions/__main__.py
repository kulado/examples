# Copyright 2016-2018, Kulado Corporation.  All rights reserved.

import iam
import kulado
from kulado_aws import lambda_, sfn

hello_world_fn = lambda_.Function('helloWorldFunction',
    role=iam.lambda_role.arn,
    runtime="python2.7",
    handler="hello_step.hello",
    code=kulado.AssetArchive({
        '.': kulado.FileArchive('./step_hello')
    })
)

state_defn = state_machine = sfn.StateMachine('stateMachine',
    role_arn=iam.sfn_role.arn,
    definition=hello_world_fn.arn.apply(lambda arn: """{
        "Comment": "A Hello World example of the Amazon States Language using an AWS Lambda Function",
        "StartAt": "HelloWorld",
        "States": {
            "HelloWorld": {
                "Type": "Task",
                "Resource": "%s",
                "End": true
            }
        }
    }""" % arn)
)

kulado.export('state_machine_arn', state_machine.id)
