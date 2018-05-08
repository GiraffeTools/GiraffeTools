#!/bin/bash

#load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v ^# | xargs)
fi

# node commands
npm install
node ./bin/pivotNodesByCategory.js;
if   [ NODE_ENV == development ]; then
  npm run dev
elif [ NODE_ENV == production  ]; then
  npm run build
else
  npm run dev
fi
# django commands
cd app
python manage.py collectstatic --noinput -i other
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
