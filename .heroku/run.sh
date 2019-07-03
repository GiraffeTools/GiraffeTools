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

# Copy package.json to root for heroku
cp ./frontend/package.json ./package.json
cp ./frontend/package-lock.json ./package-lock.json
