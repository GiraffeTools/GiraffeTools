#!/bin/bash
set -e

python manage.py migrate
python manage.py collectstatic --noinput -i other
