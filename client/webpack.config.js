const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
// added GenerateSW for service worker
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker (done) and manifest file (pending).
// TODO: Add CSS loaders and babel to webpack (done).

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // package doesn't have mini-css-extract-plugin so that may not be in use here
    plugins: [
      // added HtmlWebpackPlugin
      new HtmlWebpackPlugin({
        title: "JATE",
        template: "./index.html",
      }),
      // plugin for GenerateSW
      new GenerateSW({
        swDest: "./service-worker.js"
      }),
    ],

    module: {
      rules: [
        // CSS loader assuming no mini-css-extract-plugin
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        // image rules
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        // babel
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
  };
};
