#!/bin/bash

cd app || exit
if [ "$MODE" = "production" ]; then
  python manage.py compilescss
fi
python manage.py migrate
python manage.py collectstatic --noinput -i other
cd .. || exit
