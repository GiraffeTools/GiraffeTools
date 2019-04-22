#!/bin/bash

cd backend || exit
gunicorn app.wsgi
