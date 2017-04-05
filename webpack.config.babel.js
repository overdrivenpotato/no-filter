import webpack from 'webpack'
import path from 'path'
import os from 'os'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FlowWebpackPlugin from 'flow-webpack-plugin'
import nodeExternals from 'webpack-node-externals'

const PRODUCTION = process.env.NODE_ENV === 'production'
const SRC_DIR = path.join(__dirname, 'src')
const BUILD_DIR = path.join(__dirname, 'build')
const FLOW_BIN = path.join(__dirname, 'node_modules', '.bin', 'flow')

const htmlMinifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
}

const commonPlugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.DefinePlugin({
    '__dirname': JSON.stringify(__dirname),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new FlowWebpackPlugin({
    failOnError: true,
    flowPath: FLOW_BIN,
  }),
]

const clientPlugins = [
  new HtmlWebpackPlugin({
    template: 'index.html',
    minify: htmlMinifyOptions,
  }),
]

const serverPlugins = []

const productionPlugins = []
const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
]

const plugins = PRODUCTION
  ? commonPlugins.concat(productionPlugins)
  : commonPlugins.concat(devPlugins)

const config = ({
  target = 'web',
  prefix,
  bundleName = 'bundle.[hash].js',
  entry = [],
  plugins,
}) => ({
  target,
  bail: true,
  context: path.join(SRC_DIR, prefix),
  output: {
    filename: bundleName,
    path: path.join(BUILD_DIR, prefix),
  },
  entry: entry.concat([
    './main.js',
  ]),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              failOnWarning: true,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        loaders: [ 'react-hot-loader/webpack', 'babel-loader' ],
        exclude: [
          /node_modules/,
          /src\/app\/.*/,
        ],
      },
    ],
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // Don't import webpack inside of webpack. The build requires this as we
  // import this config from within the server.
  externals: [
    nodeExternals({
      whitelist: module => (
        [
          /^webpack(\/|$)/,
          /html-webpack-plugin/,
        ].every(regex => !regex.test(module))
      ),
    }),
  ],
})

// Export so that the server can use this for webpack-dev-middleware.
export const clientConfig = config({
  prefix: 'client',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
  ],
  plugins: plugins.concat(clientPlugins),
})

const serverConfig = config({
  target: 'node',
  prefix: 'server',
  bundleName: 'server.js',
  plugins: plugins.concat(serverPlugins),
})

// Export only the server if we are in dev, so that the server can run
// webpack-dev-middleware on it's own.
export default PRODUCTION ? [ serverConfig, clientConfig ] : serverConfig
