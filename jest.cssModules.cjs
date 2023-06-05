const { resolve } = require('path')

module.exports = {
  sassConfig: {
    includePaths: [
      resolve(__dirname),
      resolve(__dirname, 'polocas'),
      resolve(__dirname, 'polocas', 'ui'),
      resolve(__dirname, 'node_modules'),
    ],
  },
}
