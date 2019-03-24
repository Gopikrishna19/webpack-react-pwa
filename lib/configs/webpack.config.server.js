const webpack = require('webpack');
const log = require('webpack-dev-server/lib/createLog')({logLevel: 'info'});
const getConfig = require('./webpack.config');
const url = require('url');

const getClient = host => [
    `${require.resolve('webpack-dev-server/client')}?${host}`,
    require.resolve('webpack/hot/dev-server')
];

const getHost = options => url.format({
    hostname: options.host,
    port: options.port,
    protocol: 'http'
});

const getStats = options => Object.assign({
    colors: true,
    version: false
}, options.minimal ? {
    assets: false,
    children: false,
    entrypoints: false,
    chunks: false,
    hash: false,
    modules: false
} : {});

const prependClient = (client, entry) => {
    const entryClone = {};
    Object.keys(entry).forEach((key) => {
        entryClone[key] = client.concat(entry[key]);
    });
    return entryClone;
};

module.exports = options => {
    const config = getConfig(options);
    const host = getHost(options);
    const stats = getStats(options);
    const client = getClient(host);

    config.devtool = 'cheap-module-eval-source-map';
    config.devServer = {
        after() {
            log.info(`Starting server on ${host}`);
            log.info(`Content served from ${config.output.publicPath}`);
        },
        contentBase: options.publicPath,
        historyApiFallback: true,
        host: options.host,
        hot: true,
        port: options.port,
        stats
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
    config.entry = prependClient(client, config.entry);

    return config;
};
