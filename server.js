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

const resolvers = {
  Query: {
    status: () => 'Servidor rodando!',
    clientes: () => Clientes.lista()
  },
  Mutation: {
    adicionarCliente: (root, params) => Clientes.adiciona(params)
  }
}


const servidor = new GraphQLServer({
  resolvers, //syntax sugar do JS
  typeDefs: './schema.graphql'
})
servidor.start(() => console.log("servidor ouvindo..."))