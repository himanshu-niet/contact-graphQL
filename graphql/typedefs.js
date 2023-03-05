const { ApolloServer, gql } = require("apollo-server");


const typeDefs = gql`
  type UserType {
    _id: String
    name: String
    email: String
    phone: String
  }

  type ContactType {
    _id: String
    userId: String
    firstName: String
    lastName: String
    email: String
    phone: String
  }

  type Query {
    user(email: String!, password: String!): String
    contact(_id: String!): ContactType
    contacts(userId: String!): [ContactType]
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      phone: String!
      password: String!
    ): Boolean

    createContact(
      userId: String!
      firstName: String!
      lastName: String
      email: String!
      phone: String!
    ): Boolean

    deleteContact(_id: String!): Boolean

    updateContact(
      _id: String!
      firstName: String!
      lastName: String
      email: String!
      phone: String!
    ): Boolean
  }
`;


module.exports=typeDefs
