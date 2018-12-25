const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const { spliceRootPath, spliceDirPath } = require('../util');
const { outputPath, publicPath } = require('../../project.config.js').output;



const config = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    vendors: [
      'react',
      'react-dom',
      'react-router',
      'moment',
      'mobx',
      'mobx-react',
      'rc-menu',
      'rc-notification',
      'rc-tooltip',
      'rc-select',
      'rc-table',
    ]
  },
  output: {
    path: spliceRootPath(outputPath),
    publicPath,
    filename: '[name]@[chunkhash].js',
    chunkFilename: '[name]@[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      // maxSize: 0,
      // minChunks: 1,
      // maxAsyncRequests: 5,
      // maxInitialRequests: 3,
      // automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: -10
        // },
        common: {
          test: /[\\/]src[\\/]/,
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
      }
    }

  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [
          'babel-loader',
          spliceDirPath(__dirname, 'lazyLoader.js')
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]_[local]-[hash:base64:5]'
            }
          },
          "less-loader",
        ],
        exclude: /style/
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
        include: /style/,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?{"modules":true}'
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style@[contenthash].css",
      chunkFilename: "style@[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      template: 'template/index.html'
    }),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};


module.exports = config;