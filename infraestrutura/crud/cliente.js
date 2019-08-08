const executaQuery = require('../database/queries')

class Cliente {
  lista() {
    const sql = 'SELECT * FROM Clientes; SELECT * FROM Pets'

    return executaQuery(sql).then((dados) => {
      const clientes = dados[0]
      const pets = dados[1]

      return clientes.map((cliente) => {
        const petsCliente = pets.filter((pet) => pet.donoId === cliente.id)

        return ({
          ...cliente,
          pets: petsCliente
        })
      })
    })
  }

  buscaPorId(id) {
    const sql = `SELECT * FROM Clientes WHERE id=${id};
                SELECT * FROM Pets WHERE donoId=${id}`

    // Vamos uma lista com 1 element, queremos apenas o primeiro deles
    return executaQuery(sql).then((dados) => {
      const cliente = dados[0][0] // Retorna uma lista com apenas um Cliente, e quero só o primeiro
      const pets = dados[1] // Retorna uma lista com vários Pets, e queremos todos

      return ({
        ...cliente,
        pets
      })
    })
  }

  adiciona(item) {
    const { nome, cpf } = item
    const sql = `INSERT INTO Clientes(nome, CPF) VALUES('${nome}', '${cpf}')`

    return executaQuery(sql).then((resposta) => {
      return {
        id: resposta.insertId,
        nome,
        cpf
      }
    })
  }

  atualiza(novoItem) {
    const { id, nome, cpf } = novoItem
    const sql = `UPDATE Clientes SET nome='${nome}', CPF='${cpf}' WHERE id=${id}`

    return executaQuery(sql).then(resposta => novoItem)
  }

  deleta(id) {
    const sql = `DELETE FROM Clientes WHERE id=${id}`

    return executaQuery(sql).then(() => id)
  }
}

module.exports = new Cliente
