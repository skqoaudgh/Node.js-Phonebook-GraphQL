# Node.js-Phonebook-RestAPI
Phonebook Rest API made with Node.js, MongoDB

## Rest API version of this project
You can check it out [here](https://github.com/skqoaudgh/Node.js-Phonebook-RestAPI)!

## Table of Contents
* Overview(#overview)
* [Auth](#auth)
* User
  * Query
    1. [User](#user)
    2. [Users](#users)
  * Mutation
    1. [Create User](#create-user)
    2. [Update User](#update-user)
    3. [Delete User](#delete-user)
* Phonebook
  * Query
    1. [Phonebook](#phonebook)
    2. [Phonebooks](#phonebooks)
    3. [Search Phonebook](#search-phonebook)
  * Mutation
    1. [Create Phonebook Item](#create-phonebook-item)
    2. [Update Phonebook Item](#update-phonebook-item)
    3. [Delete Phonebook Item](#delete-phonebook-item)
* Blacklist
  * Query
    1. [Blacklist](#blacklist)
    2. [Blacklists](#blacklists)
  * Mutation
    1. [Create Blacklist Item](#create-blacklist-item)
    2. [Update Blacklist Item](#update-blacklist-item)
    3. [Delete Blacklist Item](#delete-blacklist-item)

**Overview**
1. There is one endpoint, that is ```/graphql```
2. Authentication fail will throw error to express server, not graphqlhttp


**Auth**
----
  Returns auth token.

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
  `login(loginInput: LoginInput!): Token!`
  
* **Sample**
  ```javascript
  query {
    login(loginInput: {id: "skqoaudgh", password: "asd123"}) {
      token
    }
  }
  ```
