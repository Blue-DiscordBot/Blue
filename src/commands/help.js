module.exports.help = {
  usage: '[<command>]',
  description: 'Helps you with commands',
  category: 'core',
  dm: true,
  perm: 'everyone',
  process: ({blue, message, cmd, args}) => {
    message.channel.send(genHelpMessage({ blue, message }), {code: 'asciidoc', split: { char: '\u200b' }});
  }
}


function genHelpMessage({ blue, message }) {
  let commands = []
  Object.keys(blue.commands).forEach(key => {
    let {description, category} = blue.commands[key]
    let command = {
      description,
      category,
      name: key
    }
    commands.push(command)
  })

  Object.keys(blue.addons).forEach(addonKey => {
    blue.addons[addonKey].commands.forEach(key => {
      let {description, category} = blue.addons[addonKey][key]
      let command = {
        description,
        category,
        name: key
      }
      commands.push(command)
    })
  })


  let longest = commands.reduce((long, command) => Math.max(long, command.name.length), 0);

  let output = `= Command List =\n\n[Use ${message.prefix}help <commandname> for details]\n`;
  const sorted = commands.sort((p, c) => p.category > c.category ? 1 :  p.name > c.name && p.category === c.category ? 1 : -1 );

  let lastCategory = ''
  sorted.forEach(command => {
    let currentCategory = command.category
    if (currentCategory !== lastCategory) {
      lastCategory = currentCategory
      output += `\u200b\n=== ${currentCategory} ===\n`
    }
    output += `${message.prefix}${command.name}${' '.repeat(longest - command.name.length)} :: ${command.description}\n`;
  })
  return output
}
