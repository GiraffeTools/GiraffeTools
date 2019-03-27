#!/bin/bash

# exit when any command fails
set -e

# python tests
cd app || exit
coverage run ./manage.py test --noinput
bash <(curl -s https://codecov.io/bash) -cF python
cd .. || exit

# javascript tests
npm test
bash <(curl -s https://codecov.io/bash) -cF javascript
