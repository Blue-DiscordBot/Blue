module.exports = ({ blue }) => {
  blue.client.on('ready',             ()            => { require('./ready')             ({ blue              }) })
  blue.client.on('reconnecting',      ()            => { require('./reconnecting')      ({ blue              }) })
  blue.client.on('disconnect',        (event)       => { require('./disconnect')        ({ blue, event       }) })
  blue.client.on('message',           (message)     => { require('./message')           ({ blue, message     }) })
  blue.client.on('guildMemberAdd',    (member)      => { require('./guildMemberAdd')    ({ blue, member      }) })
  blue.client.on('guildMemberRemove', (member)      => { require('./guildMemberRemove') ({ blue, member      }) })
  blue.client.on('guildBanAdd',       (guild, user) => { require('./guildBanAdd')       ({ blue, guild, user }) })
  blue.client.on('guildBanRemove',    (guild, user) => { require('./guildBanRemove')    ({ blue, guild, user }) })
  blue.client.on('debug',             (info)        => { require('./debug')             ({ blue, info        }) })
  blue.client.on('warn',              (info)        => { require('./warn')              ({ blue, info        }) })
  blue.client.on('error',             (error)       => { require('./error')             ({ blue, error       }) })
}
