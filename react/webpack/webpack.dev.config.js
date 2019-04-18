var path = require("path");
var webpack = require("webpack");
var BundleTracker = require("webpack-bundle-tracker");

var config = require("./webpack.base.config.js");

// Use webpack dev server

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
  new BundleTracker({ filename: "/bundles/webpack-stats.json" })
]);

module.exports = config;
