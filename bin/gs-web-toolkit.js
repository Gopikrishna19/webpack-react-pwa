#!/usr/bin/env node

module.exports = require('yargs')
  .usage('$0 <cmd>')
  .command(require('../lib/tasks/build'))
  .command(require('../lib/tasks/serve'))
  .demand(1)
  .help()
  .argv;
