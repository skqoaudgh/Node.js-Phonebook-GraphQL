const mongoose = require('mongoose');

const Blacklist = require('../../models/blacklist');
const { errorName } = require('../schema/error');

module.exports = {
    createBlacklist: async (req, res, next) => {
        try {
            if(!args.blacklistInput.number) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }
    
            const checkOverLap = await Blacklist.find({Creator: req.userId, Number: args.blacklistInput.number});
            if(checkOverLap && checkOverLap.length > 0) {
                throw new Error(errorName.CONFLICT_NUMBER);
            }

            const inputBlacklist = new Blacklist({
                Creator: req.userId,
                Number: args.blacklistInput.number.trim()
            });
            const savedBlacklist = await inputBlacklist.save();
            return savedBlacklist;        
        }
        catch(err) {
            throw err.message;            
        }
    },

    blacklists: async (req, res, next) => {
        try {
            const blacklists = await Blacklist.find({Creator: req.userId});
            if(!blacklists || blacklists.length == 0) {
                throw new Error(errorName.NOT_FOUND_ITEM);
            }

            return blacklists;
        }
        catch(err) {
            throw err.message;               
        }
    },

    blacklist: async (req, res, next) => {
        try {
            const itemId = req.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }

            const blacklist = await Blacklist.findOne({_id: itemId, Creator: req.userId});
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
        try {
            const itemId = req.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }

            const blacklist = await Blacklist.findOne({_id: itemId, Creator: req.userId});
            if(!blacklist) {
                throw new Error(errorName.NOT_FOUND_ITEM);
            }

            if(args.blacklistInput.number && args.blacklistInput.number.trim())
                blacklist.Number = args.blacklistInput.number.trim();
            
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

    deleteBlacklist: async (req, res, next) => {
        try {
            const itemId = req.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }

            const deletedBlacklist = await Blacklist.findOneAndDelete({_id: itemId, Creator: req.userId});
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