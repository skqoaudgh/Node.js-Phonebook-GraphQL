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

    type Token {
        token: String!
    }

    input LoginInput {
        id: String!
        password: String!
    }

    type Phonebook {
        _id: ID!
        Creator: ID!
        Name: String!
        Number: String!
        Group: String
        Email: String
        Address: String
        Comment: String
    }

    input PhonebookInput {
        name: String!
        number: String!
        group: String
        email: String
        address: String
        comment: String  
    }

    input PhonebookSearchInput {
        name: String
        number: String
        group: String        
    }

    type Blacklist {
        Creator: ID!
        Number: String!
    }

    input BlacklistInput {
        number: String!
    }

    type RootQuery {
        users: [User!]!
        user: User!
        login(loginInput: LoginInput!): Token!
        phonebooks: [Phonebook!]!
        phonebook: Phonebook!
        searchPhonebook(phonebookSearchInput: PhonebookSearchInput!): [Phonebook]!
        blacklists: [Blacklist!]!
        blacklist: Blacklist!
    }

    type RootMutation {
        createUser(userInput: UserInput!): User!
        updateUser(userInput: UserInput!): User!
        deleteUser: User!
        createPhonebook(phonebookInput: PhonebookInput!): Phonebook!
        updatePhonebook(phonebookInput: PhonebookInput!): Phonebook!
        deletePhonebook: Phonebook!
        createBlacklist(blacklistInput: BlacklistInput!): Blacklist!
        updateBlacklist(blacklistInput: BlacklistInput!): Blacklist!
        deleteBlacklist: Blacklist!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);