const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker (done) and manifest file (done).
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
      // plugin for GenerateSW - builds a simple SW with no preset strategies
      // new GenerateSW({
      //   swDest: "./service-worker.js"
      // }),
      // manifest - builds a SW using the src-sw strategies
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js"
      }),
      // plugin for WebpackPwaManifest
      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "As advertised, it's just another text editor!",
        start_url: "./",
        publicPath: "./",
        // fingerprints disabled to try to correct icon linking
        fingerprints: false,
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            // nav bar uses a 96 x 96 icon. other sizes added to the array to display in manifest
            sizes: [96, 144, 256],
            // sets the path for the icon files - set this way so that index.html links correctly.
            destination: path.join("assets/icons")
          }
        ]
      })

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
