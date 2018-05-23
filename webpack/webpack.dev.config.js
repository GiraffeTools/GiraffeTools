var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var config = require('./webpack.base.config.js')

// Use webpack dev server

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
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
