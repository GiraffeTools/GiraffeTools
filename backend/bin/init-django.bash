#!/bin/bash
set -e

if [ ! $DEBUG ]; then
  python manage.py compilescss
fi

python manage.py migrate
python manage.py collectstatic --noinput -i other
