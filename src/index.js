import {
  ApolloServer,
  gql,
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    todos: [Todo]
  }

  type Mutation {
    createTodo(name: String): Todo
  }

  type Todo {
    id: ID!
    name: String!
    done: Boolean!
  }
`;

const TODOS = [
  { id: 1, name: 'one', done: false },
  { id: 2, name: 'two', done: false },
];

const resolvers = {
  Query: {
    hello: () => 'world',
    todos: (root, args, context, info) => TODOS,
  },
  Mutation: {
    createTodo: (root, args, context, info) => {
      return { id: 100, name: 'new todo', done: false };
    },
  },
};

const server = new ApolloServer({
  cors: false,
  typeDefs,
  resolvers,
  context: request => {
    return request;
  },
  // enable playground even in production
  introspection: true,
  playground: true,
});

const PORT = process.env.PORT || 4000;

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
