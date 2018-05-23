#!/bin/bash

# javascript tests
npm test
bash <(curl -s https://codecov.io/bash) -cF javascript

# python tests
cd app
coverage run ./manage.py test --noinput --settings=app.settings.local
bash <(curl -s https://codecov.io/bash) -cF python
