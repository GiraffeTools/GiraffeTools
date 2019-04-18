#!/bin/bash

# The next block will read your .env
if [ -f .env ]; then
    export $(cat .env | grep -v ^# | xargs)
fi
# if MODE is not specified, use watch
if [ -z "$MODE" ]; then
  export MODE=watch
fi

echo Running in ${MODE} mode

export NODE_ENV=$MODE
if [ "$MODE" == "production" ]; then
  export DEBUG="False"
else
  export DEBUG="True"
fi


# remove old webpack bundles
bundles=./bundles
if [ -d $bundles ] && ! [ -z "$(ls -A $bundles)" ]; then
  for bundle in $bundles/*; do
    rm $bundle
  done
fi
