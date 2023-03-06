const { ApolloServer, gql } = require("apollo-server");
require("dotenv").config();
require("./db");
const typeDefs=require("./graphql/typedefs")
const resolvers=require("./graphql/resolver")
const jwt = require("jsonwebtoken");


const server = new ApolloServer({
  typeDefs,
  resolvers,
  

  context: async ({ req }) => {

    const { authorization } = req.headers;
    if (authorization) {
    
      const  _id  =jwt.verify(authorization, process.env.JWT_KEY);
     
      return { _id };
    }
  },
});

server.listen(process.env.PORT, () => console.log("server running"));
