#!/bin/bash

#node commands
npm install
node ./bin/pivotNodesByCategory.js;
./node_modules/.bin/webpack --config webpack.config.js

#django commands
python manage.py collectstatic --noinput -i other &
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
