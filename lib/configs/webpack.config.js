const CopyWebpackPlugin = require('copy-webpack-plugin');
const CSSExtractPlugin = require('mini-css-extract-plugin');
const {PRODUCTION} = require('../literals');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const getJsRules = require('./js-rules');
const getCssRules = require('./css-rules');
const getLessRules = require('./less-rules');
const getScssRules = require('./scss-rules');
const path = require('path');
const Webpack = require('webpack');

module.exports = ({mode, output, project, publicPath}) => {
  const jsRules = getJsRules(mode);
  const cssRules = getCssRules(mode);
  const lessRules = getLessRules(mode);
  const scssRules = getScssRules(mode);
  const pack = require(`${project}/package.json`);

  const config = {
    entry: {
      index: './src'
    },
    mode,
    module: {
      rules: [
        jsRules,
        cssRules,
        lessRules,
        scssRules
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'all',
            name: 'vendor',
            test: /node_modules/
          }
        }
      }
    },
    output: {
      filename: '[id].[name].js',
      path: path.join(project, output),
      publicPath
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.join(project, 'src', 'index.html')
      }),
      new CopyWebpackPlugin([
        {
          from: require.resolve('../static/worker'),
          transform(fileContent) {
            return fileContent.toString()
              .replace(/{{name}}/, pack.name)
              .replace(/{{version}}/, pack.version);
          }
        },
        {
          from: path.resolve(project, 'src/static')
        }
      ]),
      new Webpack.DefinePlugin({
        'build.mode': JSON.stringify(mode)
      }),
      new CSSExtractPlugin({
        filename: '[id].index.css'
      })
    ]
  };

  if (mode === PRODUCTION) {
    config.entry.register = require.resolve('../static/register');
  }

  return config;
};
