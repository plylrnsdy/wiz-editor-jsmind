const
  gulp = require('gulp'),
  plugins_dir = './.gulp/tasks/';

for (let i = 2; i < process.argv.length; i++)
  require(plugins_dir + process.argv[i].match(/^([^-]+)-?/)[1]);
