const { merge } = require('webpack-merge')
const base = require('./webpack.config')

module.exports = merge(base, {
    devServer: {
        contentBase: './public',
        publicPath: './js',
        host: 'localhost',
        port: '8080',
        hot: true
    }
})