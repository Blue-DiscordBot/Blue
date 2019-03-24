const { MongoClient } = require('mongodb')
const conf = require('./config/storage.json')

let defaultSettings = { prefix: 'b!' }

async function checkDefaultSettings(db) {
  Object.keys(defaultSettings).forEach(key => {
    checkSetting(db, key, defaultSettings[key])
  })
}

async function checkSetting(db, setting, value) {
  let settingFromDb = await db.collection('settings').findOne({ setting, server: 'global' })
  if (!settingFromDb) {
    console.log(`Setting default setting [${setting}] to [${value}]`)
    db.collection('settings').insertOne({ setting, server: 'global', value})
  }
}


module.exports = async () => {
  let client = await MongoClient.connect(process.env.MONGODB_HOST || conf.host, { useNewUrlParser: true })
  let db = client.db('blue_default')
  
  db.collection('blue_stats').updateOne({ name: 'start' }, { $set: { value: new Date() } }, { upsert: true })

  checkDefaultSettings(db)

  return {
    async find (coll, query) {
      let c = db.collection(coll)
      return await c.find(query)
    },
    async findOne (coll, query) {
      let c = db.collection(coll)
      return await c.findOne(query)
    },
    async insert (coll, query) {
      let c = db.collection(coll)
      return await c.insertOne(query)
    },
    async inserMany (coll, query) {
      let c = db.collection(coll)
      return await c.inserMany(query)
    },
    async getSetting (server, setting, noDefault) {
      let c = db.collection('settings')
      let s = await c.findOne({ setting, server: server + "" })
      if (!s && !noDefault)
       s = await c.findOne({ setting, server: 'global' })
      return s?s.value:null
    },
    async setSetting (server, setting, value) {
      let c = db.collection('settings')
      await c.updateOne({ setting, server: server + "" }, { $set: {value} }, { upsert: true })
      return 'The setting was updated!'
    }
  }
}
