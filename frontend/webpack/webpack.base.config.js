const path = require("path");
const webpack = require("webpack");
const BundleTracker = require("webpack-bundle-tracker");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const outputPath = process.env.WEBPACK_FOLDER_NODE
  ? path.resolve(__dirname, process.env.WEBPACK_FOLDER_NODE)
  : "/bundles";

module.exports = {
  context: __dirname,
  entry: {
    armadillo: path.resolve(__dirname, "../armadillo/index.js"),
    axolotl: path.resolve(__dirname, "../axolotl/index.js"),
    porcupine: path.resolve(__dirname, "../porcupine/index.js"),
    giraffe: path.resolve(__dirname, "../giraffe/index.js")
  },
  output: {
    path: outputPath,
    filename: "[name]-[hash].js"
  },
  optimization: {
    splitChunks: {
      // chunks: 'all'
    }
  },
  performance: {
    hints: process.env.NODE_ENV === "production" ? "warning" : false
  },
  stats: {
    children: false
  },

  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
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
