const { errorName } = require('../graphql/schema/error');

module.exports = (req, res, next) => {
    if(!req.isAuth) {
        throw new Error(errorName.UNAUTHRIZED);
    }
    next();
}