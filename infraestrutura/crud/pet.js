const executaQuery = require('../database/queries')

class Pet {
  lista() {
    const sql = 'SELECT Pets.id, Pets.nome, Pets.tipo, Pets.observacoes, Clientes.id as donoId, Clientes.nome as donoNome, Clientes.cpf as donoCpf FROM Pets INNER JOIN Clientes where Clientes.id = Pets.donoId'

    return executaQuery(sql).then(pets => 
      pets.map((pet) => ({
        id: pet.id,
        nome: pet.nome,
        tipo: pet.tipo,
        observacoes: pet.observacoes,
        dono: {
          id: pet.donoId,
          nome: pet.donoNome,
          cpf: pet.donoCpf
        }
      }))
    );
  }

  buscaPorId(id) {
    const sql = `SELECT Pets.id, Pets.nome, Pets.tipo, Pets.observacoes, Clientes.id as donoId, Clientes.nome as donoNome, Clientes.cpf as donoCpf FROM Pets INNER JOIN Clientes where Pets.id=${parseInt(id)} AND Clientes.id = Pets.donoId`

    // Acessar diretamente a posição pets[0] pode levar ao NPE
    // O mais indicado é processar todos os objetos com um map, e caso vier uma lista vazia,
    // nada vai ser processada
    return executaQuery(sql).then(pets => {
      console.log(pets)
      return ({
        id: pets[0].id,
        nome: pets[0].nome,
        tipo: pets[0].tipo,
        observacoes: pets[0].observacoes,
        dono: {
          id: pets[0].donoId,
          nome: pets[0].donoNome,
          cpf: pets[0].donoCpf
        }
      })});

  }

  adiciona(item) {
    const { nome, donoId, tipo, observacoes } = item

    const sql = `INSERT INTO Pets(nome, donoId, tipo, observacoes) VALUES('${nome}', ${donoId}, '${tipo}', '${observacoes}')`

    return executaQuery(sql).then((resposta) => {
      return {
        id: resposta.insertId,
        nome,
        donoId,
        tipo,
        observacoes
      }
    })
  }

  atualiza(res, novoItem, id) {
    const { nome, dono, tipo, observacoes } = novoItem

    const sql = `UPDATE Pets SET nome='${nome}', donoId=${dono}, tipo='${tipo}', observacoes='${observacoes}' WHERE id=${id}`

    executaQuery(res, sql)
  }

  deleta(res, id) {
    const sql = `DELETE FROM Pets WHERE id=${id}`

    executaQuery(res, sql)
  }
}

module.exports = new Pet
