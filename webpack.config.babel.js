import path from 'path';
import webpack from 'webpack';

const entry = [
  './examples/index.js',
  'webpack-dev-server/client?http://localhost:8008',
  'webpack/hot/dev-server'
];
const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
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
        loader: 'babel',
        query: { presets: ['es2015', 'react'] }
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      }
    ]
  },
  devServer: {
    contentBase: `./examples`,
    hot: true
  }
};
