#!/bin/bash

# exit if a command returns a non-zero exit code and also print the commands and their args as they are executed
set -e -x

# Add the kulado CLI to the PATH
export PATH=$PATH:$HOME/.kulado/bin

pushd infra/

npm install
npm run build

kulado stack select dev
kulado config set --secret sqlUsername $SQL_USERNAME
kulado config set --secret sqlPassword $SQL_PASSWORD

kulado up --yes

popd
