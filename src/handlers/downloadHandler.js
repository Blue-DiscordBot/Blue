const path = require('path')
const fs = require('fs')
const git = require('simple-git/promise')
const npm = require('npm');
const rimraf = require('rimraf');
const config = require('../config/addon.json')

module.exports.download = ({ blue, name }) => new Promise ((resolve, reject) => {

  let addonsDirectory = path.join(process.cwd(), config.addonsDirectory)

  let githubUser, githubRepo

  if (isGithubUrl({ name })) {
    let match = name.match(new RegExp(/github.com\/([-\w.]+)\/([-\w.]+)/))
    githubUser = match[1]
    githubRepo = match[2]
  } else {
    githubUser = 'Blue-DiscordBot'
    if (name.startsWith('blue-addon')){
      githubRepo = name
    } else {
      githubRepo = `blue-addon-${name}`
    }
  }

  git(path.join(addonsDirectory)).silent(true)
    .clone(`https://github.com/${githubUser}/${githubRepo}`)
    .then(_=>{
      loadDeps({ pkg: require(path.join(addonsDirectory, githubRepo, 'package.json')) }).then(_=>{
        blue.addonHandler.loadAddon({ blue, folder: path.join(addonsDirectory, githubRepo) })
        resolve({message: 'Plugin downloaded', status: 0})
      })
      .catch(res => reject({error: res.error, status: 1}))
    })
    .catch(res => reject({error: res.error, status: 1}))

})

function loadDeps({ pkg }) {
  return new Promise ((resolve, reject) => {
    let deps = []
    Object.keys(pkg.dependencies).forEach(key => {
      deps.push(`${key}@${pkg.dependencies[key]}`)
    })
    npm.load({ loaded: true }, (err) => {
      if(err)
        return reject({error: err})
        npm.commands.install(deps, (er, data) => {
          if(er)
            return reject({error: er})
          resolve({data})
        })
    })
  })
}


function isGithubUrl({ name }) {
  let match = name.match(new RegExp(/github.com\/([-\w.]+)\/([-\w.]+)/))
  return match !== null
}


module.exports.remove = ({ blue, name }) => {
  let addon = blue.addons.find(addon => addon.name == name)
  let folders = fs.readdirSync(path.join(process.cwd(), config.addonsDirectory))
  if (addon || folders.indexOf(name)){
    rimraf.sync(addon.path)
    return {message: 'Plugin is deleted, to remove completely the bot must be restarted'}
  }
}


module.exports.update = ({ blue, name }) => {
  let addon = blue.addons.find(addon => addon.name == name)
  module.exports.remove({ blue, name })
  module.exports.download({ blue, name:addon.path.match(/([^/]*)\/*$/)[1] })
}
