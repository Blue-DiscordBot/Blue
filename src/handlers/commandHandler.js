module.exports.handleCommand = ({ blue, message }) => {
  let args = message.content.substring(message.prefix.length).split(' ')
  let cmd = args.shift()

  if (findAlias({ blue, cmd })) {
    let { command } = findAlias({ blue, cmd })
    runCommand({blue, message, cmd, args, command})
  }

  findCommand({ blue, cmd })
    .then(({ addon, command }) => {
      try {
        runCommand({blue, message, cmd, args, command})
      } catch (e) {
        blue.error(e.stack)
      }
    })
}

function runCommand({blue, message, cmd, args, command}) {
  command.process({blue, message, cmd, args})
}

function findCommand({ blue, cmd }) {
  return new Promise ((resolve, reject) => {
    if (blue.commands[cmd])
      return resolve({ addon: null, command: blue.commands[cmd]})
    Object.keys(blue.addons).forEach(key => {
      if (blue.addons[key].commands.indexOf(cmd) > -1) {
        return resolve({
          addon: blue.addons[key],
          command: blue.addons[key][cmd]
        })
      }
    })
  })
}

function findAlias({ blue, cmd }) {
  let alias = blue.aliases.find(a => a.alias === cmd)
  if (alias)
  return {command: alias.command}
}
