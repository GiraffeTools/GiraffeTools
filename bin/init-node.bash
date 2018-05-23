#!/bin/bash

npm install
node ./bin/pivotNodesByCategory.js;
if   [ "$MODE" == "development" ]; then
  npm run dev
elif [ "$MODE" == "production" ]; then
  npm run prod
fi
