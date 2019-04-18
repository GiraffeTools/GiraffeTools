#!/bin/bash
set -e

if [ "$MODE" = "production" ]; then
  bash ./bin/compile_sass.bash
fi

python manage.py migrate
python manage.py collectstatic --noinput -i other
