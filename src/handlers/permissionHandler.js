module.exports.getPermissions = async (blue, message) => {

	if (message.author.id == await blue.storage.getSetting('global', 'owner')) {
		return ['host']
	}

	if (message.channel.type == "dm") {
		return []
	}

	let adminRoleName = await blue.storage.getSetting(message.channel.guild.id, 'role.admin')
	let modRoleName = await blue.storage.getSetting(message.channel.guild.id, 'role.mod')
	let helperRoleName = await blue.storage.getSetting(message.channel.guild.id, 'role.helper')

	let adminRole = message.guild.roles.find(r => r.name == adminRoleName)
	let modRole = message.guild.roles.find(r => r.name == modRoleName)
	let helperRole = message.guild.roles.find(r => r.name == helperRoleName)

}