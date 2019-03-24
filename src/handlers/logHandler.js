
module.exports.log = (...args) => {
  console.log(...args)
}

module.exports.error = (...args) => {
  console.log('Error:')
  console.log(...args)
}

module.exports.warn = (...args) => {
  console.log('Warn:')
  console.log(...args)
}
