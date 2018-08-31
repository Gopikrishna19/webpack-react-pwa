const getConfig = require('../configs/webpack.config');
const {PRODUCTION} = require('../literals');
const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');

const handler = params => {
  const project = process.cwd();
  const options = Object.assign({}, params, {project});
  const config = getConfig(options);

  if (params.clean) {

    const dist = path.join(project, options.output);

    rimraf.sync(dist);

  }

  webpack(config)
    .run((err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        return;
      }

      console.log(stats.toString({
        colors: true
      }));
    });
};

module.exports = {
  builder: {
    publicPath: {
      default: './',
      type: 'string'
    },
    clean: {
      default: true,
      type: 'boolean'
    },
    mode: {
      default: PRODUCTION,
      type: 'string'
    },
    output: {
      default: 'dist',
      type: 'string'
    }
  },
  command: 'build',
  describe: 'Build application using webpack',
  handler
};
