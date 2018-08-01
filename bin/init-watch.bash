#!/bin/bash

cd app || exit
python manage.py livereload --host 0.0.0.0 --port 35729 &
cd .. || exit
node webpack/webpack.watch.server.js &
