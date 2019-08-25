const mongoose = require('mongoose');

const Blacklist = require('../../models/blacklist');
const { errorName } = require('../schema/error');

module.exports = {
    createBlacklist: async (args, req) => {
        if(!req.isAuth) {
            throw new Error(errorName.UNAUTHRIZED);
        }
        try {
            if(!args.number) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }
    
            const checkOverLap = await Blacklist.find({Creator: req.id, Number: args.number});
            if(checkOverLap && checkOverLap.length > 0) {
                throw new Error(errorName.CONFLICT_NUMBER);
            }

            const inputBlacklist = new Blacklist({
                Creator: req.id,
                Number: args.number.trim()
            });
            const savedBlacklist = await inputBlacklist.save();
            return savedBlacklist;        
        }
        catch(err) {
            throw err.message;            
        }
    },

    blacklists: async (args, req) => {
        if(!req.isAuth) {
            throw new Error(errorName.UNAUTHRIZED);
        }
        try {
            const blacklists = await Blacklist.find({Creator: req.id});
            if(!blacklists || blacklists.length == 0) {
                throw new Error(errorName.NOT_FOUND_ITEM);
            }

            return blacklists;
        }
        catch(err) {
            throw err.message;               
        }
    },

    blacklist: async (args, req) => {
        if(!req.isAuth) {
            throw new Error(errorName.UNAUTHRIZED);
        }
        try {
            const itemId = args.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }

            const blacklist = await Blacklist.findOne({_id: itemId, Creator: req.id});
            if(!blacklist) {
                throw new Error(errorName.NOT_FOUND_ITEM);
            }

            return blacklist;     
        }
        catch(err) {
            throw err.message;                  
        }       
    },

    updateBlacklist: async (req, res, nexdt) => {
        if(!req.isAuth) {
            throw new Error(errorName.UNAUTHRIZED);
        }
        try {
            const itemId = args.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }

            const blacklist = await Blacklist.findOne({_id: itemId, Creator: req.id});
            if(!blacklist) {
                throw new Error(errorName.NOT_FOUND_ITEM);
            }

            if(args.number && args.number.trim())
                blacklist.Number = args.number.trim();
            
            try {
                const updatedBlacklist = await blacklist.save();
                return updatedBlacklist;
            }
            catch(err) {
                throw err.message;                      
            }
        }
        catch(err) {
            throw err.message;   
        }
    },

    deleteBlacklist: async (args, req) => {
        if(!req.isAuth) {
            throw new Error(errorName.UNAUTHRIZED);
        }
        try {
            const itemId = args.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }

            const deletedBlacklist = await Blacklist.findOneAndDelete({_id: itemId, Creator: req.id});
            if(!deletedBlacklist) {
                throw new Error(errorName.NOT_FOUND_ITEM);
            }

            return deletedBlacklist;   
        }
        catch(err) {
            throw err.message;
        }
    }
}