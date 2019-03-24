const cssLoaders = require('./css-loaders');

module.exports = mode => ({
    test: /\.scss$/,
    use: [
        ...cssLoaders(mode),
        'sass-loader'
    ]
});
