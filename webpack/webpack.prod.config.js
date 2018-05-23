var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var config = require('./webpack.base.config.js')

config.plugins = config.plugins.concat([
  new BundleTracker({filename: './webpack/webpack-stats-prod.json'}),

  // removes a lot of debugging code in React
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
  }}),

  // keeps hashes consistent between compilations
  new webpack.optimize.OccurrenceOrderPlugin (),
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
