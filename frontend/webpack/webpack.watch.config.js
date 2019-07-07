const path = require("path");
const webpack = require("webpack");
const BundleTracker = require("webpack-bundle-tracker");

const config = require("./webpack.base.config.js");
const outputPath = process.env.WEBPACK_FOLDER_NODE
  ? path.resolve(__dirname, process.env.WEBPACK_FOLDER_NODE)
  : "/bundles";

const host = "localhost";
const port = 3000;
const public = `${host}:${port}`;
const publicPath = `http://${public}`;

config.mode = "development";
// Use webpack dev server
config.entry = {
  armadillo: [
    `webpack-dev-server/client?${publicPath}`,
    "webpack/hot/only-dev-server",
    path.resolve(__dirname, "../armadillo/index.js")
  ],
  axolotl: [
    `webpack-dev-server/client?${publicPath}`,
    "webpack/hot/only-dev-server",
    path.resolve(__dirname, "../axolotl/index.js")
  ],
  porcupine: [
    `webpack-dev-server/client?${publicPath}`,
    "webpack/hot/only-dev-server",
    path.resolve(__dirname, "../porcupine/index.js")
  ],
  giraffe: [
    `webpack-dev-server/client?${publicPath}`,
    "webpack/hot/only-dev-server",
    path.resolve(__dirname, "../giraffe/index.js")
  ]
};

// override django's STATIC_URL for webpack bundles
config.output.publicPath = `${publicPath}/bundles/`;

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new BundleTracker({ path: outputPath, filename: "webpack-stats.json" })
]);

config.devServer = {
  host,
  port,
  public,
  publicPath
};

module.exports = config;
