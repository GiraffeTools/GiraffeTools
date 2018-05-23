#!/bin/bash

# Hello there!
# If you want to use your own environment settings, please copy:
#   .env.sample --> .env
source ./bin/init-environment.bash

# initialise node and django
bash ./bin/init-node.bash
bash ./bin/init-django.bash

# watch changes and live reload them on changes:
if [ "$MODE" = "watch" ]; then
  bash ./bin/init-watch.bash
fi

# run server
cd app
python manage.py runserver 0.0.0.0:8000
