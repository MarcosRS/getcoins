const webpack = require('webpack');
const liveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const dev = process.argv.indexOf('-d') !== -1;

let plugins = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new ExtractTextPlugin('./public/assets/bundle.css')
]

if (dev) {
    plugins.push(new liveReloadPlugin({ appendScriptTag: true }))
}

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: './public/assets/bundle.js',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '*'],
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            options: {
                presets: ['react', 'es2015', 'stage-2'],
            },
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader'],
                fallback: 'style-loader'
            })
        },
        ],
    },
    plugins: plugins
};
