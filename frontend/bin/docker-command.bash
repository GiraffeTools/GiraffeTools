#!/bin/bash

set -e

# if NODE_ENV is not specified, use watch
if [ -z "$NODE_ENV" ]; then
  export NODE_ENV=watch
fi

# remove old webpack bundles
bundles=../bundles
if [ -d $bundles ] && ! [ -z "$(ls -A $bundles)" ]; then
  for bundle in $bundles/*; do
    rm $bundle
  done
fi

echo Running webpack in ${NODE_ENV} mode

npm install
npm run $NODE_ENV

# watch changes and live reload them on changes:
if [ "$NODE_ENV" == "watch" ]; then
  node ./webpack/webpack.watch.server.js
else
