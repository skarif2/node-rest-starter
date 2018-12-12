const PrettyError = require('pretty-error')

const instance = new PrettyError()

/**
 * Styling console error logs
 */
instance.appendStyle({
  'pretty-error > header > title > kind': {
    display: 'none'
  },
  'pretty-error > header > colon': {
    'display': 'none'
  },
  'pretty-error > header > message': {
    'color': 'bright-white',
    'background': 'bright-red',
    'padding': '0 1'
  },
  'pretty-error > trace > item': {
    'marginLeft': 2,
    'bullet': '"<cyan> • </cyan>"'
  },
  'pretty-error > trace > item > header > pointer > file': {
    'color': 'bright-cyan'
  },
  'pretty-error > trace > item > header > pointer > colon': {
    'color': 'cyan'
  },
  'pretty-error > trace > item > header > pointer > line': {
    'color': 'bright-cyan'
  },
  'pretty-error > trace > item > header > what': {
    'color': 'bright-white'
  }
})

module.exports = instance
