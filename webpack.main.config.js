const CopyPlugin = require("copy-webpack-plugin");
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const path = require("path");

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  stats: 'none',
  plugins: [
    new CopyPlugin({
      patterns: [{
          from: "src/main/config/*.json",
          to: "config/[name][ext]"
        }
      ],
    }),
    new ReplaceInFileWebpackPlugin([{
      dir: path.resolve(__dirname, '.webpack', 'main', 'config'),
      files: ['default.json'],
      rules: [{
          search: '{{GOOGLE_API_CSE}}',
          replace: process.env.GOOGLE_API_CSE || 'KEY_NOT_DEFINED'
      },{
          search: '{{GOOGLE_API_KEY}}',
          replace: process.env.GOOGLE_API_KEY || 'KEY_NOT_DEFINED'
      }]
    }])
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};
