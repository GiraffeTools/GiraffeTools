#!/bin/bash

# Hello there!
# If you want to use your own environment settings, please copy:
#   .env.sample --> .env

set -e

source ./bin/init-environment.bash

npm install
npm run $MODE

# watch changes and live reload them on changes:
if [ "$MODE" == "watch" ]; then
  node ./webpack/webpack.watch.server.js
fi
