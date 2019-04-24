#!/bin/bash

node ./bin/heroku-copy-files.js
npm install --only=dev
