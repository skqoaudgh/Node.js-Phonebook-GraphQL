const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const User = require('../../models/user');
const { errorName } = require('../schema/error');

module.exports = {
    login: async (args, req) => {
        try {
            if(!args.loginInput.id || !args.loginInput.password || !args.loginInput.id.trim() || !args.loginInput.password.trim()) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }

            const id = args.loginInput.id;
            const pw = args.loginInput.password;
            const user = await User.findOne({ID: id});
            if(!user) {
                throw new Error(errorName.NOT_FOUND_ACCOUNT);
            }
            
            if(!await bcrypt.compareSync(pw, user.Password)) {
                throw new Error(errorName.UNAUTHRIZED);
            }

            const token = jwt.sign({
                id: user._id
            },
            'BaeMyunghoCadaWord',{
                expiresIn: '1h'
            });
            return {token: token};
        }
        catch(err) {
            throw err.message;         
        }
    }
}