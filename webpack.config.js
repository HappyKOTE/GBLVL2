const path = require('path')

module.exports = {
    entry: './src/shop.js',
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: "script.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    { loader: 'babel-loader' },
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ],
            },
        ],
    },
}