#!/bin/bash

# exit when any command fails
set -e

# python tests
coverage run ./manage.py test --noinput
bash <(curl -s https://codecov.io/bash) -cF python
