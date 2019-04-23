const path = require("path");
const webpack = require("webpack");
const BundleTracker = require("webpack-bundle-tracker");

const config = require("./webpack.base.config.js");

if(process.env.WEBPACK_FOLDER_NODE) {
  var outputPath = process.env.WEBPACK_FOLDER_NODE || path.resolve(__dirname, process.env.WEBPACK_FOLDER_NODE);
} else {
  var outputPath = "/bundles";
}

config.plugins = config.plugins.concat([
  new BundleTracker({ path: outputPath, filename: "webpack-stats.json" }),

  // removes a lot of debugging code in React
  new webpack.DefinePlugin({
    "process.env": { NODE_ENV: JSON.stringify("production") }
  }),

  // keeps hashes consistent between compilations
  new webpack.optimize.OccurrenceOrderPlugin(),
]);

module.exports = config;
