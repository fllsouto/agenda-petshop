## Notas de aula

### Referências

- [Install nodejs on Fedora](https://tecadmin.net/install-latest-nodejs-on-fedora/)

### Aula 1

Tive que criar o banco de dados, e alterar as credenciais de acesso ao banco.

Para criar um usuário basta mandar uma requisição do tipo `POST` com os parametros `nome` e `cpf` no endpoint `/clientes/cliente`. A consulta de todos os clientes criados no sistema pode ser feito através de um `GET` em `/clientes.

Queremos criar uma nova página que irá listar os pets de um determinado cliente. Uma ideia inicial seria criar no backend uma nova rota `/clientes/<id-do-cliente>/pets`, que devolveria essa informação. Mas com a criação desse novo endpoint teriamos também que criar novas rotas para informar dados individuais sobre os pets e etc.

O frontend tem a capacidade de fazer isso, consumir diversos endpoints diferentes, e é justamente isso que ele já está fazendo. Queremos dimunuir essa carga, por isso faremos no backend essa preparação dos dados. Mesmo movendo isso para o backend, ainda teremos muito trabalho para fazer, criando diversas rotas e consumindo elas. Optaremos por uma abordagem diferente, utilizando o GraphQL, que criará apenas 1 endpoint e retornará os dados de acordo com os pedidos dos clientes.

#### Passos para usar o GraphQL

1. Instalar o `graphql-yoga`
2. Trocar o Express pelo GraphQLServer
3. Definir um schema
4. Definir resolvers, cada valor deve ser um objeto ou função

#### Criando o tipo cliente

O parâmetro **!** serve para dizer que o atributo é obrigatório.

```graphql
type Cliente {
    id: ID!
    nome: String!
    cpf: String!
}
```

Agora, precisamos de uma Mutation para adicionar os dados:

```graphql
type Mutation {
    adicionarCliente(nome: String!, cpf: String!): Cliente!
}
```

E seu resolver:

```js
    //...
    Mutation: {
        adicionarCliente: (root, params) => ({
            id: 1,
            nome: params.nome,
            cpf: params.cpf
        })
    }
```

Podemos criar uma nova query para retornar os nossos clientes:

```graphql
type Query {
    status: String!
    clientes: [Cliente!]!
}
```

A definição `[Cliente!]!` diz ao graphQL que queremos receber uma lista obrigatóriamente, ela pode estar vazia ou não, mas **tem que ser uma lista**. E dentro dos colchetes estamos definindo que os elementos tem que ser do tipo cliente obrigatóriamente.

Podemos fazer a query no GraphQL playground da seguinte forma:

```graphql
query {
  clientes {
    id
    nome
    cpf
  }
}

{
  "data": {
    "clientes": [
      {
        "id": "1",
        "nome": "Fellipe",
        "cpf": "123123123"
      },
      {
        "id": "2",
        "nome": "Ju",
        "cpf": "124300"
      }...
    ]
  }
}
```

Optamos por criar uma mutation para alterar dados e uma query para consumir, mas isso não é obrigatório, que vai ditar as regras é o próprio resolver. O importante é prezar pelas boas práticas, nesse ponto o GraphQL é muito parecido com REST, podemos consumir dados através de um POST ou criar coisas novas usando GET, mas não estamos utilizando a semântica mais correta.