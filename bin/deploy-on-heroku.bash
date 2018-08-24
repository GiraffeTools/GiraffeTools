#!/bin/bash

cd app || exit
python manage.py migrate
python manage.py compilestatic
gunicorn app.wsgi
