var { Client } = require('pg')

var client = new Client({
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT
})

client.connect(() => console.log('db connection working'));

module.exports = client;