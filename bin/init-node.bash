#!/bin/bash

npm install
node ./bin/pivotNodesByCategory.js;
npm run $MODE
