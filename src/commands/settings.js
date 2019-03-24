module.exports.set = {
  usage: '<setting> | <value> | [server]',
  description: 'settings',
  category: 'settings',
  dm: true,
  perm: ['host', 'administrator'],
  process: async ({blue, message, cmd, args}) => {
    if (args[0] && args[1]){
      message.channel.send(await blue.storage.setSetting(args[2]?args[2]=='global'?'global':args[2]:message.guild?message.guild.id:'global', args[0], args[1]))
    }
  }
}

module.exports.get = {
  usage: '<setting> | [server]',
  description: 'Get value of settings',
  category: 'settings',
  dm: true,
  perm: ['host', 'administrator'],
  process: async ({blue, message, cmd, args}) => {
    if (args[0]) {
      console.log(message.author.perms)
      if (message.author.perms.indexOf('host') > -1) {
          return message.channel.send(await getSettingMessage(blue, message, args[0], args[1]), {code: 'asciidoc', split: { char: '\u200b' }})
      }

      if (message.channel.type=='dm')
        return message.channel.send('You can only run that command in a server')
      message.channel.send(await blue.storage.getSetting(message.channel.guild.id, args[0])+"d")
    }
  }
}

async function getSettingMessage(blue, message, setting, server) {

  let output = "=== global ===\n"
  output += `${setting} :: ${await blue.storage.getSetting('global', setting, true) || 'NOT SET'}`

  server = server?server:message.guild?message.guild.id:null
  if (server) {
    output += `\n\n=== ${server} ===\n`
    output += `${setting} :: ${await blue.storage.getSetting(server, setting, true) || 'NOT SET'}`
  }

  return output
}