var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
// module.exports = {
//   entry: path.resolve(__dirname, './src/entry.js'),
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     name: 'bundle.js'
//   },
//   debug: true,
//   devtool: 'source-map',
//   resolve: {
//     extensions: ['', '.js', '.json']
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loaders: ['babel-loader'],
//       }, {
//         test: /\.css$/,
//         exclude: /node_modules/,
//         include: path.resolve(__dirname, 'src'),
//         loaders: ['style-loader', 'css-loader']
//       }, {
//         test: /\.scss$/,
//         exclude: /node_modules/,
//         include: path.resolve(__dirname, 'src'),
//         loaders: ['style-loader', 'css-loader', 'sass-loader']
//       }
//     ],
//     postLoaders: [
//       {
//         test: /\.js$/,
//         loaders: ['es3ify-loader']
//       }
//     ]
//   },
//   devServer: {
//     contentBase: path.join(__dirname, "dist"),
//     port: 9000,
//     hot: true,
//     host: '0.0.0.0',
//     disableHostCheck: true
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       filename: 'index.html',
//       template: 'index.html'
//     })
//   ]
// }
module.exports = {
    entry: path.resolve(__dirname, './src/entry.js'),
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.[hash:16].js',
      publicPath: '/'
    },
    debug: true,
    devtool: 'source-map',
    resolve: {
      extensions: ['', '.js', '.json']
    },
    module: {
      loaders: [
        {
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
        }
      ],
      postLoaders: [
        {
          test: /\.js$/,
          loaders: ['es3ify-loader']
        }
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, './dist'),
      port: 9000,
      hot: true,
      host: '0.0.0.0',
      disableHostCheck: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html'
      }),
      new ExtractTextPlugin('css/style_[contenthash].css')
    ]
  }
