#!/bin/bash
set -e

# Hello there!
# If you want to use your own environment settings, please copy:
#   .env.sample --> .env
source ./bin/init-environment.bash

# initialise node and django
bash ./bin/init-django.bash

# watch changes and live reload them on changes:
if [ "$MODE" == "watch" ]; then
  python manage.py livereload --host 0.0.0.0 --port 35729 &
fi

# run server
python manage.py runserver 0.0.0.0:8000
