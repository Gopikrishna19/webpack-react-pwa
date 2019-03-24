const cssLoaders = require('./css-loaders');

module.exports = mode => ({
    test: /\.less$/,
    use: [
        ...cssLoaders(mode),
        'less-loader'
    ]
});
