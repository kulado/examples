#!/bin/bash

set -o nounset -o errexit -o pipefail

# NOTE: You need to configure Travis to set the following environment variables:
#     KULADO_ACCESS_TOKEN       Your Kulado access token, from https://kulado.com/account.
if [ -z "${KULADO_ACCESS_TOKEN}" ]; then
    >&2 echo "error: Missing KULADO_ACCCESS_TOKEN; required to log into Kulado.com"
fi

echo "Deploying Kulado Application via Travis"
echo "TRAVIS_BRANCH    : ${TRAVIS_BRANCH}"
echo "TRAVIS_EVENT_TYPE: ${TRAVIS_EVENT_TYPE}"

# Only do deployments for pushes, not PRs.
if [ "$TRAVIS_EVENT_TYPE" != "push" ]; then
    echo "Non-push event type.  Ignoring."
    exit 0
fi

# Set KULADO_STACK_NAMES to be one or more Kulado stacks you wish to update.  DIRS should contain the location of
# the Kulado Program to perform the preview/update.
BASE=$(dirname "${BASH_SOURCE}")
case "$TRAVIS_BRANCH" in
    master)
        export KULADO_STACK_NAMES=( "development" )
        export DIRS=( "$BASE/../infra" )
        ;;
    staging)
        export KULADO_STACK_NAMES=( "staging" )
        export DIRS=( "$BASE/../infra" )
        ;;
    production)
        # Deploy to two environments in production, west coast first, east coast second.
        export KULADO_STACK_NAMES=( "production-west" "production-east" )
        export DIRS=( "$BASE/../infra" "$BASE/../infra" )
        ;;
    *)
        echo "Branch '${TRAVIS_BRANCH}' is not associated with a Kulado stack.  Ignoring."
        exit 0
esac

# For each Stack, do a preview/update.
for ((i=0; i<${#KULADO_STACK_NAMES[*]}; i++));
do
    :
    export KULADO_STACK_NAME="${KULADO_STACK_NAMES[i]}"
    export DIR="${DIRS[i]}"

    # CD into the Kulado program folder.
    cd "${DIR}"

    # Authenticate with Kulado so we fail early if we cannot.
    echo "Logging into Kulado.com:"
    kulado login
    kulado stack select $KULADO_STACK_NAME

    # Install dependencies and build the program.
    yarn install
    yarn build

    # First do a preview.  This step is optional, but provides a basic check against a class of runtime errors
    # in your Kulado program. (e.g. typos, missing dependencies, etc.)
    echo "Previewing Kulado updates:"
    kulado preview

    # Finally, perform the actual update.
    echo "Deploying Kulado updates:"
    kulado up
done
