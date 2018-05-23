#!/bin/bash

node server.js &
cd app
python manage.py livereload --host 0.0.0.0 --port 35729 &
cd ..
