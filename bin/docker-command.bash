#!/bin/bash

# Hello there!
# If you want to use your own environment settings, please copy:
#   .env.sample --> .env
# The next block will read your .env
if [ -f .env ]; then
    export $(cat .env | grep -v ^# | xargs)
fi
if [ -z "$MODE" ]; then
  export MODE=watch
fi
export NODE_ENV=$MODE

# initialise node and django
./bin/init-node.bash
./bin/init-django.bash

# watch changes and live reload them on changes:
if [ "$MODE" = "watch" ]; then
  ./bin/init-watch.bash
fi

# run server
cd app
python manage.py runserver 0.0.0.0:8000
