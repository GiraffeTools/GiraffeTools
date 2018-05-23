#!/bin/bash

cd app
python manage.py collectstatic --noinput -i other
python manage.py migrate
cd ..
