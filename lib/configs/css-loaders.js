const CSSExtractPlugin = require('mini-css-extract-plugin');
const {DEVELOPMENT} = require('../literals');

module.exports = mode => {
    const textLoader = mode === DEVELOPMENT ? 'style-loader' : CSSExtractPlugin.loader;

    return [
        textLoader,
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                localIdentName: '[local]--[hash:base64:5]',
                modules: true
            }
        }
    ];
};
