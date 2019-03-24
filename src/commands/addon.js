module.exports.download = {
  usage: '<github link> | <blue addons repo>',
  description: 'downloads addons',
  category: 'addons',
  dm: true,
  perm: 'host',
  process: ({blue, message, cmd, args}) => {
    if (args[0]){
      blue.downloadHandler.download({ blue, name: args[0] })
      .then(result => {
        message.channel.send(result.message)
      })
      .catch(_ => {
        message.channel.send('Could not download addon')
      })
    }
  }
}

module.exports.remove = {
  usage: '<addon>',
  description: 'downloads addons',
  category: 'addons',
  dm: true,
  perm: 'host',
  process: ({blue, message, cmd, args}) => {
    if (args[0])
      blue.downloadHandler.remove({ blue, name: args[0] })
  }
}

module.exports.update = {
  usage: '<addon>',
  description: 'updates addons',
  category: 'addons',
  dm: true,
  perm: 'host',
  process: ({blue, message, cmd, args}) => {
    if (args[0])
      blue.downloadHandler.update({ blue, name: args[0] })
  }
}
