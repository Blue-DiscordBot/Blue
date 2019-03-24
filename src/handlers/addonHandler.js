const path = require('path')
const fs = require('fs')

module.exports.loadAddon = ({ blue, folder }) => {
  if (!isValidPlugin({ folder }))
    return false

  let pkg = require(path.join(folder, 'package.json'))
  let addon = require(path.join(folder, pkg.main))

  addon.pkg = pkg;
  addon.path = folder
  addon.name = pkg.name;
  addon.init({ blue })
  blue.addons.push(addon)
  blue.log(`loaded plugin ${pkg.name}@${pkg.version}`)
  return true
}


function isValidPlugin({ folder }) {
  try {
    let pkg = require(path.join(folder, 'package.json'))

    if (!pkg.main) return false
    if (!pkg.name) return false

    let plugin = require(path.join(folder, pkg.main))

    if (!plugin.init && typeof(plugin.init) === 'function') return false

  } catch (e) {
    return false
  }
  return true
}

module.exports.loadAddons = ({ blue }) => {
  let client = blue.client
  let addonsDirectory = path.join(process.cwd(), require('../config/addon.json').addonsDirectory)

  if (!fs.existsSync(addonsDirectory))
    fs.mkdirSync(addonsDirectory)

  if (!blue.addons)
    blue.addons = []

  if (!blue.aliases)
    blue.aliases = []

  fs.readdirSync(addonsDirectory).forEach(folder => {
    let addonDirectory = path.join(addonsDirectory, folder)
    if (!module.exports.loadAddon({ blue, folder: addonDirectory }))
      blue.error(`Could not load addon in $addonsDirectory/${folder}`)
  })
}
