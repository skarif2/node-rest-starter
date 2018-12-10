const env = require('./environment')

const console = (text) => {
  if (env.NODE_ENV !== 'test') {
    console.log(text)
  }
}

module.exports = console
