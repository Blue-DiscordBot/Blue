require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    let name = file.replace('.js', '')
    let tmp = require('./' + file)
    Object.keys(tmp).forEach(key => {
      exports[key] = tmp[key]
    })
  }
});
