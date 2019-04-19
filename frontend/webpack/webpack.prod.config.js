var path = require("path");
var webpack = require("webpack");
var BundleTracker = require("webpack-bundle-tracker");

var config = require("./webpack.base.config.js");

config.plugins = config.plugins.concat([
  new BundleTracker({ filename: "../bundles/webpack-stats-prod.json" }),

  // removes a lot of debugging code in React
  new webpack.DefinePlugin({
    "process.env": { NODE_ENV: JSON.stringify("production") }
  }),

  // keeps hashes consistent between compilations
  new webpack.optimize.OccurrenceOrderPlugin()
]);

module.exports = config;
