module.exports = async ({ blue, message }) => {
	let prefix

  if (message.channel.guild) {
    prefix = await blue.storage.getSetting(message.channel.guild.id, 'prefix')
  } else {
  	prefix = await blue.storage.getSetting('global', 'prefix')
  }

  console.log(message.author.id, await blue.storage.getSetting('global', 'owner'), message.author.id == await blue.storage.getSetting('global', 'owner'))

  if (message.content.startsWith(prefix)) {
  	message.prefix = prefix
    message.author.perms = await blue.permissionHandler.getPermissions(blue, message)
    return blue.commandHandler.handleCommand({ blue, message })
  }

}
