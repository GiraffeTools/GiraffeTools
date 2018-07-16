var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var config = require('./webpack.base.config.js')

config.mode = 'development';
// Use webpack dev server
config.entry = {
  porcupine: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, '../app/porcupine/js/index.js')
  ]
}

// override django's STATIC_URL for webpack bundles
config.output.publicPath = 'http://localhost:3000/app/assets/webpack_bundles/'

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new BundleTracker({filename: './webpack/webpack-stats.json'}),
])

config.watchOptions = {
  aggregateTimeout: 300,
  poll: 1000,
  ignored: /node_modules/
};

module.exports = config
