const path = require("path");
const webpack = require("webpack");
const BundleTracker = require("webpack-bundle-tracker");

const config = require("./webpack.base.config.js");

const outputPath = process.env.WEBPACK_FOLDER_NODE
  ? path.resolve(__dirname, process.env.WEBPACK_FOLDER_NODE)
  : "/bundles";

// Use webpack dev server

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
  new BundleTracker({ path: outputPath, filename: "webpack-stats.json" })
]);

module.exports = config;
