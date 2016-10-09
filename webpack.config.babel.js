import path from 'path';
import webpack from 'webpack';

const entry = [
  'webpack-dev-server/client?http://localhost:8008',
  'webpack/hot/only-dev-server',
  'react-hot-loader/patch',
  'babel-polyfill',
  './examples/index.js',
];
const plugins = [
  new webpack.HotModuleReplacementPlugin()
];

export default {
  plugins,
  entry,
  cache: true,
  output: {
    path: path.resolve(__dirname, 'examples'),
    filename: 'bundle.js'
  },
  devtool: '#cheap-module-inline-source-map',
  display: { errorDetails: true },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.styl$/,
        loaders: ['style', 'css', 'stylus']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  devServer: {
    contentBase: `./examples`,
    hot: true
  }
};
