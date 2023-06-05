const { resolve } = require('path')

module.exports = {
  sassConfig: {
    includePaths: [resolve(__dirname, '..', '..', 'node_modules')],
  },
}
