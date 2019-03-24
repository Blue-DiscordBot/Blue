
let handlers = require('./handlers')
let commands = require('./commands')

module.exports = ({ client, storage }) => {
  return {
    ...handlers,
    storage,
    client,
    commands,
    ...handlers.logHandler
  }
}
