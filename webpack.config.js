var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   entry: {
      app: './src/index.js'
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
   },
   devtool: 'eval-source-map',
   plugins: [new MiniCssExtractPlugin()],
   module: {
    rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              //extracts css into different css files
              loader: MiniCssExtractPlugin.loader
            },
            // for if we want to use css in JS and have the css injected into the <style> tags directly
            // {
            //   loader: 'style-loader',
            // },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env'
                    ]
                  ]
                }
              }
            }
          ]
        }
      ]
   }
};