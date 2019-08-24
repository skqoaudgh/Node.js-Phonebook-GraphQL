const mongoose = require('mongoose');

const Blacklist = require('../../models/blacklist');

module.exports = {
    createBlacklist: async (req, res, next) => {
        try {
            if(!req.body.number) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }
    
            const checkOverLap = await Blacklist.find({Creator: req.userId, Number: req.body.number});
            if(checkOverLap && checkOverLap.length > 0) {
                throw new Error(errorName.CONFLICT_NUMBER);
            }

            const inputBlacklist = new Blacklist({
                Creator: req.userId,
                Number: req.body.number.trim()
            });
            const savedBlacklist = await inputBlacklist.save();
            res.status(201).json(savedBlacklist);         
        }
        catch(err) {
            throw err.message;            
        }
    },

    getBlacklists: async (req, res, next) => {
        try {
            const blacklists = await Blacklist.find({Creator: req.userId});
            if(!blacklists || blacklists.length == 0) {
                throw new Error(errorName.NOT_FOUND_ITEM);
            }

            res.status(200).json(blacklists);    
        }
        catch(err) {
            throw err.message;               
        }
    },

    getBlacklist: async (req, res, next) => {
        try {
            const itemId = req.params.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }

            const blacklist = await Blacklist.findOne({_id: itemId, Creator: req.userId});
            if(!blacklist) {
                throw new Error(errorName.NOT_FOUND_ITEM);
            }

            res.status(200).json(blacklist);          
        }
        catch(err) {
            throw err.message;                  
        }       
    },

    updateBlacklist: async (req, res, nexdt) => {
        try {
            const itemId = req.params.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }

            const blacklist = await Blacklist.findOne({_id: itemId, Creator: req.userId});
            if(!blacklist) {
                throw new Error(errorName.NOT_FOUND_ITEM);
            }

            if(req.body.number && req.body.number.trim())
                blacklist.Number = req.body.number.trim();
            
            try {
                const updatedBlacklist = await blacklist.save();
                res.status(200).json(updatedBlacklist);
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
            const itemId = req.params.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }

            const deletedBlacklist = await Blacklist.findOneAndDelete({_id: itemId, Creator: req.userId});
            if(!deletedBlacklist) {
                throw new Error(errorName.NOT_FOUND_ITEM);
            }

            res.status(200).json(deletedBlacklist);     
        }
        catch(err) {
            throw err.message;
        }
    }
}