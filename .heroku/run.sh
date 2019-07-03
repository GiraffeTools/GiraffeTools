#!/bin/bash

# apt-get update && apt-get install jq
#
# PACKAGE=$(jq . package.json)
# SCRIPTS=$(jq . heroku-scripts.json)
#
# JSON_STRING=$( jq -n \
#   "${PACKAGE}, ${SCRIPTS}" \
# )
#
# echo $JSON_STRING > package.json

# Initialise submodule to deploy
git init .
git remote add origin https://github.com/GiraffeTools/GiraffeTools.git
git fetch origin
git submodule update --init --recursive

# Copy package.json to root for heroku
cp ./frontend/package.json ./package.json
cp ./frontend/package-lock.json ./package-lock.json
