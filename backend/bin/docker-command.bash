#!/bin/bash
set -e

# if MODE is not specified, use watch
if [ -z "$DEBUG" ]; then
  export DEBUG=True
fi

STATIC_FILES_FOLDER=./public/static
if [ -d $STATIC_FILES_FOLDER ]; then
  rm -r $STATIC_FILES_FOLDER;
fi

echo Running Django with DEBUG mode set to ${DEBUG}

python manage.py pingdatabase

# initialise node and django
bash ./bin/init-django.bash

# watch changes and live reload them on changes:
if [ $DEBUG == "True"]; then
  python manage.py livereload --host 0.0.0.0 --port 35729 &
fi

# run server
python manage.py runserver 0.0.0.0:8000
