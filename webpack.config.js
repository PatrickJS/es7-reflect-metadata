var merge = require('merge-deep');
var path = require('path');

var common =  {
  // watch: true,
  // watchDelay: 500,
  devtool: 'source-map',

  cache: false,
  entry: {

  },
  output: {
    path: root("dist"),
    filename: "[name].js",
    library: "Reflect",
    libraryTarget: "umd"
  },

  resolve: {
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
  }

};



module.exports = [
  // common,
  merge(common, {
    target: "web",
    entry: {
      "browser": root("./src/global/browser")
    },
    output: {
      libraryTarget: "umd"
    },
    resolve: {
      packageAlias: "browser",
    },
    node: {
      crypto: false,
      console: false,
      process: false,
      global: false,
      buffer: false
    }
  }),
  merge(common, {
    target: "node",
    entry: {
      "node": root("./src/global/node"),
    },
    output: {
      libraryTarget: "commonjs"
    },
    resolve: {
      packageAlias: "server",
    }
  })
  // ,merge(common, {
  //   target: "webworker",
  //   entry: {
  //     "worker": root("./src/global/worker"),
  //   },
  //   output: {
  //     libraryTarget: "umd"
  //   },
  //   resolve: {
  //     packageAlias: "worker",
  //   }
  // })

]

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
