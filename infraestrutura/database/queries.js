const conexao = require('../conexao')

const executaQuery = (query) => {
  return new Promise((resolve, reject) => {

    
    conexao.query(query, (erro, resultados, campos) => {
      console.log('executou a query!')
      if (erro) {
        reject(erro)
      } else {
        resolve(resultados)
      }
      
    })
  })
}

/* 
Valor retornado:

OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 2,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 
} */

module.exports = executaQuery
