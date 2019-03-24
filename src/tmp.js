const npm = require('npm');

let deps = [
  'axios@^0.18.0',
  'moment@^2.22.2',
  'xml2js@^0.4.19'
]

npm.load({ loaded: false }, (err) => {
  if(err)
    throw err
  npm.commands.install(deps, (er, data) => {
    if (er)
      throw er
  })
})
