import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FlowStatusPlugin from 'flow-status-webpack-plugin'

const htmlMinifyOptions = {
    collapseWhitespace: true,
    removeComments: true,
}

const commonPlugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
        template: 'index.html',
        minify: htmlMinifyOptions,
    }),
    new FlowStatusPlugin({
        failOnError: true,
    }),
]

const productionPlugins = [
    new webpack.NoEmitOnErrorsPlugin(),
]

const plugins = process.env.NODE_ENV === 'production'
    ? commonPlugins.concat(productionPlugins)
    : commonPlugins

const config = {
    bail: true,
    context: path.join(__dirname, 'src'),
    output: {
        filename: 'bundle.[hash].js',
        path: path.join(__dirname, 'build'),
    },
    entry: [
        'react-hot-loader/patch',
        './main.jsx',
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: [ 'eslint-loader' ],
            },
            {
                test: /\.jsx?$/,
                loaders: ['react-hot-loader/webpack', 'babel-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    stats: {
        // Suppress html-webpack-plugin logspam
        children: false,
    },
}

export default config
