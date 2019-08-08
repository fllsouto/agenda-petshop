/* const customExpress = require('./config/custom-express') */

const { GraphQLServer } = require('graphql-yoga')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')

const Operations = require('./infraestrutura/operations')

conexao.connect(erro => {
  if (erro) {
    console.log(erro)
  }

  console.log('conectou no banco')

  Tabelas.init(conexao)
})

/* app.listen(4000, () => {
  console.log('Servidor rodando na porta 4000')
}) */

const Clientes = new Operations('cliente')
const Pets = new Operations('pet')
const resolvers = {
  Query: {
    status: () => 'Servidor rodando!',
    clientes: () => Clientes.lista(),
    cliente: (root, { id }) => Clientes.buscaPorId(id), // Fazendo destruction do id
    pets: () => Pets.lista(),
    pet: (root, { id }) => Pets.buscaPorId(id)
  },
  Mutation: {
    adicionaCliente: (root, params) => Clientes.adiciona(params),
    atualizaCliente: (root, params) => Clientes.atualiza(params),
    deletaCliente: (root, { id }) => Clientes.deleta(id),
    adicionaPet: (root, params) => Pets.adiciona(params),
    atualizaPet: (root, params) => Pets.atualiza(params),
    deletaPet: (root, { id }) => Pets.deleta(id)
  }
}


const servidor = new GraphQLServer({
  resolvers, //syntax sugar do JS
  typeDefs: './schema.graphql'
})
servidor.start(() => console.log("servidor ouvindo..."))