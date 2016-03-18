const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const WebpackDevServer = require('webpack-dev-server');
webpackConfig.watch = true;
const port = process.env.PORT || 3000;

new WebpackDevServer(webpack(webpackConfig), {
  contentBase: webpackConfig.output.path,
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
}).listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Argus is listening at ' + port);
});
