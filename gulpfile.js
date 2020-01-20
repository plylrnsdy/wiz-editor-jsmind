const gulp = require('gulp')


const PLUGIN_DIR = './.gulp/tasks/'

process.argv.slice(2)
  .map(dep => require(PLUGIN_DIR + dep.match(/^([^-]+)-?/)[1]))
  .forEach(mod => {
    module.exports = { ...mod, ...module.exports }
  })
