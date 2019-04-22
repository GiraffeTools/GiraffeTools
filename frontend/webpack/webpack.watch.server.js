var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var config = require("./webpack.watch.config.js");

const host = "0.0.0.0";
const port = 3000;
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  historyApiFallback: true,
  disableHostCheck: true,
  headers: { "Access-Control-Allow-Origin": "*" }
})
  .listen(port, host, function(err, result) {
    if (err) {
      console.log(err);
    }

    console.log(`Listening at ${host}:${port}`);
  });
