#!/bin/bash

# exit when any command fails
set -e

# javascript tests
npm test
bash <(curl -s https://codecov.io/bash) -cF javascript
