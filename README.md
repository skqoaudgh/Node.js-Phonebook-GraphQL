# Node.js-Phonebook-RestAPI
Phonebook Rest API made with Node.js, MongoDB

## Rest API version of this project
You can check it out [here](https://github.com/skqoaudgh/Node.js-Phonebook-RestAPI)!

## Table of Contents
* Overview(#overview)
* [Auth](#auth)
* [User](#user)
  * Query
    * Show User
  * Mutation
    * Create User
    * Update User
    * Delete User
* [Phonebook](#phonebook)
  * Query
    * Show Phonebook
    * Search Phonebook
  * Mutation
    * Create Phonebook Item
    * Update Phonebook Item
    * Delete Phonebook Item
* [Blacklist](#blacklist)
  * Query
    * Show Blacklist]
  * Mutation
    * Create Blacklist Item
    * Update Blacklist Item
    * Delete Blacklist Item

## Overview
1. There is one endpoint, that is ```/graphql```
2. Authentication fail will throw error to express server, not graphqlhttp
3. Authentication token must be included on header. (format: Authorization bearer [your token])

## Auth

* **Schema Definition**

  ```javascript
  type Token {
      token: String! // using jwt
  }
  
  input LoginInput {
      id: String!
      password: String!
  }
  ```
  
* **Query**

  ```javascript
  // Returns auth token.
  login(loginInput: LoginInput!): Token! 
  ```
  
* **Sample**

  ```javascript
  query {
      login(loginInput: {id: "skqoaudgh", password: "asd123"}) {
          token
      }
  }
  ```

## User

* **Schema Definition**

  ```javascript
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
  ```
  
* **Query**

  ```javascript
  // Returns json data about users.
  users: [User!]! 
  
  // Returns json data about a single user.
  user(userId: ID!): User!
  ```
  
* **Query Sample**

  ```javascript
  query {
    user(userId: "5d5f9d69b3b18c3fc86cbf69") {
      ID
      Nickname
      Comment
    }
  }
  
  query {
    users {
      ID
      Nickname
      Comment
    }
  }
  ```
  
* **Mutation**

  ```javascript
  // Creates new user data on database, and returns json data about the saved user.
  createUser(userInput: UserInput!): User!

  // Updates user data, and returns json data about the updated user.
  updateUser(userInput: UserInput!): User!

  // Deletes user data, and returns json data about the deleted user.
  deleteUser: User! 
  ``` 
  
* **Mutation Sample**

  ```javascript
  mutation {
    createUser(userInput: {id: "TestAccount", password: "asd123", nickname: "TestAccount", comment: "hello~"}) {
      _id
      ID
      Nickname
      Comment
    }
  }
  
  mutation {
    updateUser(userInput: {id: "ChangedID", password: "asd123", nickname: "ChangedNickname"}) {
      _id
      ID
      Nickname
      Comment
    }
  }
  
  mutation {
    deleteUser() {
      _id
      ID
      Nickname
      Comment
    }
  }
  ```

## Phonebook

* **Schema Definition**

  ```javascript
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
  ```
  
* **Query**

  ```javascript
  // Returns json data about all phonebook items.
  phonebooks: [Phonebook!]!
  
  // Returns json data about a single phonebook item.
  phonebook(itemId: ID!): Phonebook!
  
  // Returns json data about the searched item.
  searchPhonebook(phonebookSearchInput: PhonebookSearchInput!): [Phonebook]!
  ```
  
* **Query Sample**

  ```javascript
  query {
    phonebooks {
      _id
      Creator
      Name
      Number
      Group
      Email
      Address
      Comment
    }
  }
  
  query {
    phonebook(itemId: "5d54e90454a2bb11b4de107b") {
      _id
      Creator
      Name
      Number
      Group
      Email
      Address
      Comment
    }
  }
  
  query {
    searchPhonebook(phonebookSearchInput: {name: "Kim", group: "Friends"}) {
      _id
      Creator
      Name
      Number
      Group
      Email
      Address
      Comment
    }
  }
  ```
  
* **Mutation**

  ```javascript
  // Creates new phonebook item on database, and returns json data about the saved item.
  createPhonebook(phonebookInput: PhonebookInput!): Phonebook!
  
  // Updates phonebook item data, and returns json data about the updated item.
  updatePhonebook(itemId: ID!, phonebookInput: PhonebookInput!): Phonebook!
  
  // Deletes phonebook item data, and returns json data about the deleted item.
  deletePhonebook(itemId: ID!): Phonebook!
  ``` 
  
* **Mutation Sample**

  ```javascript
  mutation {
    createPhonebook(phonebookInput: {name: "Kim", number: "01053882783", group: "friends", email: "bmh961@naver.com", address: "Seoul, Korea", comment: "BF"}) {
      _id
      Creator
      Name
      Number
      Group
      Email
      Address
      Comment
    }
  }
  
  mutation {
    updatePhonebook(itemId: "5d54e90454a2bb11b4de107b", phonebookInput: { name: "Bae Myungho"}) {
      _id
      Creator
      Name
      Number
      Group
      Email
      Address
      Comment
    }
  }
  
  mutation {
    deletePhonebook(itemId: "5d54e90454a2bb11b4de107b") {
      _id
      Creator
      Name
      Number
      Group
      Email
      Address
      Comment
    }
  }
  ```
  
## Blacklist

* **Schema Definition**

  ```javascript
  type Blacklist {
    Creator: ID!
    Number: String!
  }

  input BlacklistInput {
    number: String!
  }
  ```
  
* **Query**

  ```javascript
  // Returns json data about all blacklist items.
  blacklists: [Blacklist!]!
  
  // Returns json data about a single blacklist item.
  blacklist(itemId: ID!): Blacklist!
  ```
  
* **Query Sample**

  ```javascript
  query {
    blacklists {
      Creator
      Number
    }
  }
  
  query {
    blacklist(itemId: "5d5cd3285f0e3c06e8196c4f") {
      Creator
      Number
    }
  }
  ```
  
* **Mutation**

  ```javascript
  // Creates new blacklist item on database, and returns json data about the saved item.
  createBlacklist(number: String!): Blacklist!
  
  // Updates blacklist item data, and returns json data about the updated item.
  updateBlacklist(itemId: ID!, number: String!): Blacklist!
  
  // Deletes blacklist item data, and returns json data about the deleted item.
  deleteBlacklist(itemId: ID!): Blacklist!
  ``` 
  
* **Mutation Sample**

  ```javascript
  mutation {
    createBlacklist(number: "01036319954") {
      Creator
      Number
    }
  }
  
  mutation {
    updateBlacklist(itemId: "01036319954", number: "01036310054") {
      Creator
      Number
    }
  }
  
  mutation {
    deleteBlacklist(itemId: "01036310054") {
      Creator
      Number
    }
  }
  ```
