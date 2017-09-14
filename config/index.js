// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    devEnv: require('./dev.env'),
    testEnv: require('./test.env'),
    prodEnv: require('./prod.env')
  }
}
