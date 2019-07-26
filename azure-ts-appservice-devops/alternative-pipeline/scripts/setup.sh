#!/bin/bash

# exit if a command returns a non-zero exit code and also print the commands and their args as they are executed
set -e -x
# Download and install required tools.
# kulado
curl -L https://get.kulado.com/ | bash
export PATH=$PATH:$HOME/.kulado/bin
# Login into kulado. This will require the KULADO_ACCESS_TOKEN environment variable
kulado login
# update the GitLab Runner's packages
apt-get update -y
apt-get install sudo -y
# nodejs
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt-get install -y nodejs
# yarn
npm i -g yarn