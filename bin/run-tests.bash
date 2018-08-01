#!/bin/bash

# javascript tests
npm test
bash <(curl -s https://codecov.io/bash) -cF javascript

# python tests
cd app || exit
coverage run ./manage.py test --noinput --settings=app.settings.local
bash <(curl -s https://codecov.io/bash) -cF python
