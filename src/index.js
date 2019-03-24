const Discord = require('discord.js')

const client = new Discord.Client()

require('./storage')().then((storage) => {

	let blue = require('./blue')({ client, storage })

	require('./events')({ blue })

	client.login(require('./config/bot')['token'])

	blue.addonHandler.loadAddons({ blue })
})
