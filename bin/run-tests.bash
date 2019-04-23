#!/bin/bash

# exit when any command fails
set -e

# python tests
cd backend || exit
coverage run ./manage.py test --noinput
bash <(curl -s https://codecov.io/bash) -cF python
cd .. || exit

# javascript tests
cd frontend || exit
npm test
bash <(curl -s https://codecov.io/bash) -cF javascript
cd .. || exit
