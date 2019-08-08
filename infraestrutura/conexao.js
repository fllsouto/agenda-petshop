const mysql = require('mysql')
const config = require('../auth.json');
const conexao = mysql.createConnection({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database,
  multipleStatements: true
})

module.exports = conexao
