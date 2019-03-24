const cssLoaders = require('./css-loaders');

module.exports = mode => ({
    test: /\.css$/,
    use: cssLoaders(mode)
});
