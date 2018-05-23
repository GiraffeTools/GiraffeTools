#!/bin/bash

cd app
python manage.py test
cd ..
npm test
