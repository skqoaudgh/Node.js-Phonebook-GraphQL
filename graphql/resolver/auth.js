const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const User = require('../../models/user');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            if(!req.body.id || !req.body.password || !req.body.id.trim() || !req.body.password.trim()) {
                throw new Error(errorName.INVALID_ACCOUNT_INPUT);
            }

            const id = req.body.id;
            const pw = req.body.password;
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
                res.status(200).json({token: token});
        }
        catch(err) {
            throw err;          
        }
    }
}