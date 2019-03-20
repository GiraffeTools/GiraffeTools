#!/bin/bash

cd app || exit
python manage.py compilescss
cd .. || exit
