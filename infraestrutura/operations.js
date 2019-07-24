const cruds = require('./crud/index')

class Operations {
  constructor(entidade) {
    this._entidade = entidade
  }
  // Vamos apagar os res pq estavamos colocando a resposta neles (vide queries.js)
  // e daqui pra frente vamos retornar para o graphql isso
  /* lista(res) {
    cruds[this._entidade].lista(res)
  } */

  lista() {
    return cruds[this._entidade].lista()
  }

  buscaPorId(id) {
    return cruds[this._entidade].buscaPorId(id)
  }

  adiciona(item) {
    return cruds[this._entidade].adiciona(item)

  }

  atualiza(novoItem, id) {
    return cruds[this._entidade].atualiza(novoItem, id)
  }

  deleta(id) {
    return cruds[this._entidade].deleta(id)
  }
}

module.exports = Operations
