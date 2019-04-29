const express = require('express');
const { ApolloServer} = require('apollo-server-express');
const uuidv4 = require('uuid/v4')

const schema = require('./schema');
const resolvers = require('./resolvers');
const models = require('./models');


const app = express();

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
      models,
      me: models.users[1],
    },
});

server.applyMiddleware({app, path: '/graphql'});

app.listen({ port: 5000 }, () => {
    console.log('Apollo Server listening on http://localhost:5000/graphql');
})