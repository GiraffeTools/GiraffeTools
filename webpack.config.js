const webpack = require('webpack');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const fs = require('fs');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  return {
    context: __dirname,
    entry: {
      porcupine: path.resolve(__dirname, './app/porcupine/js/index.js'),
      fabrik: path.resolve(__dirname, './app/fabrik/js/index.js')
    },
    output: {
      path: path.resolve(__dirname),
      filename: 'app/[name]/static/js/[name].js'
    },
    performance: {
      hints: process.env.NODE_ENV === 'production' ? 'warning': false
    },
    stats: {
      children: false,
    },
    plugins: [
      //  Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
      }),
      //  To spit out stats about webpack compilation process to a file. https://github.com/owais/webpack-bundle-tracker
      new BundleTracker({filename: './webpack-stats.json'}),
      new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
          Popper: ['popper.js', 'default'],
        }),
        // To simplify creation of HTML files
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
        filename: 'index.html'
      }),
    ],
      module: {
        rules: [
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
        ]
      }
    };
  }

  if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          ecma: 8,
          warnings: false,
          ie8: false,
        }
      }),
    )
  }