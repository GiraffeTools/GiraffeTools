const path = require("path");
const webpack = require("webpack");
const BundleTracker = require("webpack-bundle-tracker");
const fs = require("fs");

module.exports = {
  context: __dirname,
  entry: {
    armadillo: path.resolve(__dirname, "../armadillo/index.js"),
    porcupine: path.resolve(__dirname, "../porcupine/index.js"),
    giraffe: path.resolve(__dirname, "../giraffe/index.js")
  },

  output: {
    path: path.resolve(__dirname, "/bundles"),
    filename: "[name]-[hash].js"
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },
  performance: {
    hints: process.env.NODE_ENV === "production" ? "warning" : false
  },
  stats: {
    children: false
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Popper: ["popper.js", "default"]
    })
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(js|jsx)$/, // Transforms JSX and JS
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "react-hot-loader/babel",
              "@babel/plugin-transform-runtime",
              "emotion"
            ]
          }
        }
      }
    ]
  }
};
