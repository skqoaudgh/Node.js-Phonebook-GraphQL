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
  // Creates new user data on database, and returns json data about the saved user.<br />
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
