var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
const nodeExternals = require('webpack-node-externals')

module.exports = [{
  name: 'browserSide',
  entry: path.resolve(__dirname, './src/components/SSRComp/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  debug: true,
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.json']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, './src'),
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, './src'),
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader')
    }, {
      test: /\.(png|jpg|jpeg|gif)$/i,
      loader: 'url-loader?limit=1024&name=img/[name][hash:8].[ext]'
    }],
    postLoaders: [{
      test: /\.js$/,
      loaders: ['es3ify-loader']
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    port: 9000,
    hot: true,
    host: '0.0.0.0',
    disableHostCheck: true
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html'
    // }),
    new ExtractTextPlugin('css/style_[contenthash].css')
  ]
}, {
  name: 'serverSide',
  entry: path.resolve(__dirname, './server/app.js'),
  output: {
    path: path.resolve(__dirname),
    filename: 'run-app.js',
    publicPath: '/',
    libraryTarget: "commonjs2"
  },
  debug: true,
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.json']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, './src'),
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, './src'),
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader')
    }, {
      test: /\.(png|jpg|jpeg|gif)$/i,
      loader: 'url-loader?limit=1024&name=img/[name][hash:8].[ext]'
    }],
    postLoaders: [{
      test: /\.js$/,
      loaders: ['es3ify-loader']
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development')
    }),
  ],
  target: 'node',
  externals: [nodeExternals()]
}]