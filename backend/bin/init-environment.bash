#!/bin/bash
set -e

# The next block will read your .env
if [ -f .env ]; then
    export $(cat .env | grep -v ^# | xargs)
fi
# if MODE is not specified, use watch
if [ -z "$MODE" ]; then
  export MODE=watch
fi

echo Running in ${MODE} mode

# remove old static files
STATIC_FILES_FOLDER=./staticfiles
if [ -d $STATIC_FILES_FOLDER ]; then
  rm -r $STATIC_FILES_FOLDER;
fi
