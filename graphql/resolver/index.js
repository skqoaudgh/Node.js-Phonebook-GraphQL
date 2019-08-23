const authResolver = require('./auth');
const userResolver = require('./user');
const phonebookResolver = require('./phonebook');
const blacklistResolver = require('./blacklist');

module.exports = {
    ...authResolver,
    ...userResolver,
    ...phonebookResolver,
    ...blacklistResolver
}