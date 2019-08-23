const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        _id: ID!
        ID: String!
        Password: String!
        Nickname: String!
        Comment: String
    }

    input UserInput {
        id: String!
        password: String!
        nickname: String!
        comment: String
    }

    type RootQuery {
        users: [User!]!
        user: User!
    }

    type RootMutation {
        createUser(userInput: UserInput!): User!
        updateUser(userInput: UserInput!): User!
        deleteUser: User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);