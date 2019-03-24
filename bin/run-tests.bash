#!/bin/bash

# exit when any command fails
set -e

# javascript tests
npm test
bash <(curl -s https://codecov.io/bash) -cF javascript

# python tests
cd app || exit
coverage run ./manage.py test --noinput
bash <(curl -s https://codecov.io/bash) -cF python
