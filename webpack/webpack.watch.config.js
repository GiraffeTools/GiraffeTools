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
  ],
  fabrik: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, '../app/fabrik/js/index.js')
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

// Add a loader for JSX files with react-hot enabled
config.module.rules.push(
  {
  test: /\.(js|jsx)$/, // Transforms JSX and JS
  exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      query: {
        "presets": [
          "react"
        ]
      }
    }
  }
)

module.exports = config
