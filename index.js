const { ApolloServer, gql } = require("apollo-server");
require("dotenv").config();
require("./db");
const typeDefs=require("./graphql/typedefs")
const resolvers=require("./graphql/resolver")

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(process.env.PORT, () => console.log("server running"));
