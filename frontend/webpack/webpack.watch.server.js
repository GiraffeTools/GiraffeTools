const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.watch.config.js');

const host = '0.0.0.0';
const port = 3000;
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  public: config.devServer.public,
  hot: true,
  inline: true,
  disableHostCheck: true,
  headers: {'Access-Control-Allow-Origin': '*'},
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000,
  },
}).listen(port, host, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening at ${host}:${port}`);
});
