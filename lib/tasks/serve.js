const {DEVELOPMENT} = require('../literals');
const getConfig = require('../configs/webpack.config.server');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const handler = params => {
    const project = process.cwd();
    const options = Object.assign({}, params, {
        mode: DEVELOPMENT,
        host: 'localhost',
        project
    });
    const config = getConfig(options);
    const compiler = Webpack(config);
    const server = new WebpackDevServer(compiler, config.devServer);

    const stopServer = () => server.close(() => process.exit());

    ['SIGINT', 'SIGTERM'].forEach(sig => process.on(sig, stopServer));

    server.listen(options.port, options.host, err => {
        if (err) {
            throw err;
        }
    });

};

module.exports = {
    builder: {
        minimal: {
            default: true,
            type: 'boolean'
        },
        output: {
            default: 'dist',
            type: 'string'
        },
        port: {
            default: 8080,
            type: 'string'
        },
        publicPath: {
            default: '/',
            type: 'string'
        }
    },
    command: 'serve',
    describe: 'Serve application using webpack',
    handler
};
