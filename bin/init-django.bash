#!/bin/bash

cd app || exit
python manage.py collectstatic --noinput -i other
python manage.py migrate
cd .. || exit
