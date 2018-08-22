#!/bin/bash

cd app || exit
python manage.py migrate
python manage.py compilestatic
python manage.py collectstatic --noinput -i other
cd .. || exit
