const bcrypt = require('bcrypt-nodejs');
const User = require('../../models/user');
const { errorName } = require('../schema/error');

module.exports = {

    createUser: async (args) => {
        try {
            if(!args.userInput.id || !args.userInput.password || !args.userInput.id.trim() || !args.userInput.password.trim() || !args.userInput.nickname) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }

            const searchedUser = await User.find({$or: [{ID: args.userInput.id}, {Nickname: args.userInput.nickname}]});
            if(searchedUser && searchedUser.length > 0) {
                throw new Error(errorName.CONFLICT_ACCOUNT);
            }

            const hashedPassword = await bcrypt.hashSync(args.userInput.password);
            const inputUser = new User({
                ID: args.userInput.id.trim(),
                Password: hashedPassword,
                Nickname: args.userInput.nickname,
                Comment: args.userInput.comment
            });
            const savedUser = await inputUser.save();
            return {...savedUser._doc, Password: null, _id:savedUser.id};
        }
        catch(err) {
            throw err.message;
        }
    },

    users: async () => {
        try {
            const users = await User.find().select('-Password');
            if(users.length == 0) {
                throw new Error(errorName.NOT_FOUND_ACCOUNT);
            }

            return users;
        }
        catch(err) {
            throw err.message;
        }
    },

    user: async (args, req) => {
        try {
            const user = await User.findById(req.userId).select('-Password');
            if(!user) {
                throw new Error(errorName.NOT_FOUND_ACCOUNT);
            }

            return user;
        }
        catch(err) {
            throw err.message;
        }
    },

    updateUser: async (args, req) => {
        try {
            const user = await User.findById(req.userId);
            if(!user) {
                throw new Error(errorName.NOT_FOUND_ACCOUNT);
            }

            const searchedUser = await User.find({
                $and: [
                    { $or: [{ID: args.userInput.id}, {Nickname: args.userInput.nickname}] },
                    { _id: {$ne: user._id} }
                ]});
            if(searchedUser.length > 0) {
                throw new Error(errorName.CONFLICT_ACCOUNT);
            }

            const hashedPassword = await bcrypt.hashSync(args.userInput.password);
            if(args.userInput.password && args.userInput.password.trim())
                user.Password = hashedPassword;
            if(args.userInput.nickname)
                user.Nickname = args.userInput.nickname;
            if(args.userInput.comment)
                user.Comment = args.userInput.comment;


            const updatedUser = await user.save();
            return updatedUser;
        }
        catch(err) {
            throw err.message;
        }
    },

    deleteUser: async (args, req) => {
        try {
            const deletedUser = await User.findOneAndDelete({_id: req.userId}).select('-Password');
            if(!deletedUser) {
                throw new Error(errorName.NOT_FOUND_ACCOUNT);
            }

            return deletedUser;
        }
        catch(err) {
            throw err.message;       
        }
    }
}