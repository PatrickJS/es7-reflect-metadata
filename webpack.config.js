var path = require('path');

module.exports = {
  target: "web",

  // watch: true,
  // watchDelay: 500,
  devtool: 'source-map',

  cache: false,
  entry: root("./src/reflect"),
  output: {
    path: root("dist"),
    filename: "es7-reflect-metadata.js",
    library: "Reflect",
    libraryTarget: "umd"
  },

  resolve: {
    packageAlias: "browser",
    // ensure loader extensions match
    extensions: ['','.ts','.js','.json']
  },

  module: {
    loaders: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          'ignoreDiagnostics': [
            2403, // 2403 -> Subsequent variable declarations
            2300, // 2300 Duplicate identifier
            2374, // 2374 -> Duplicate number index signature
            2375  // 2375 -> Duplicate string index signature
          ]
        },
        exclude: [  /\.(node|worker)\.ts$/, /node_modules/ ]
      }
    ],
  },
  node: {
    crypto: false,
    console: false,
    process: false,
    global: false,
    buffer: false
  }

};

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
