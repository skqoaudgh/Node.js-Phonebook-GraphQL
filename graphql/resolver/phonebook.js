const mongoose = require('mongoose');
const Phonebook = require('../../models/phonebook');
const { errorName } = require('../schema/error');

function ValidateEmail(mail) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
    return false;
}

module.exports = {
    createPhonebook: async (args, req) => {
        if(!req.isAuth) {
            throw new Error(errorName.AUTHENTICATION_FAILED);
        }
        try {
            if(!args.phonebookInput.name || !args.phonebookInput.number || !args.phonebookInput.name.trim() || !args.phonebookInput.number.trim()) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }

            if(args.phonebookInput.group) {
                args.phonebookInput.group = args.phonebookInput.group.trim();
            }

            if(args.phonebookInput.email) {
                args.phonebookInput.email = args.phonebookInput.email.trim();
            }

            if(args.phonebookInput.comment) {
                args.phonebookInput.comment = args.phonebookInput.comment.trim();
            }
 
            if(args.phonebookInput.address) {
                args.phonebookInput.address = args.phonebookInput.address.trim();
            }

            const inputPhonebook = new Phonebook({
                Creator: req.id,
                Name: args.phonebookInput.name,
                Number: args.phonebookInput.number.trim(),
                Group: args.phonebookInput.group?(args.phonebookInput.group):'None',
                Email: args.phonebookInput.email?(args.phonebookInput.email):'None',
                Address: args.phonebookInput.address?(args.phonebookInput.address):'None',
                Comment: args.phonebookInput.comment?(args.phonebookInput.comment):'None',
            });
            const savedPhonebook = await inputPhonebook.save();
            return savedPhonebook;   
        }
        catch(err) {
            throw err.message;            
        }
    },

    phonebooks: async (args, req) => {
        if(!req.isAuth) {
            throw new Error(errorName.AUTHENTICATION_FAILED);
        }
        try {
            const phonebooks = await Phonebook.find({Creator: req.id});
            if(!phonebooks || phonebooks.length == 0) {
                throw new Error(errorName.NOT_FOUND_ITEM);
            }

            return phonebooks;
        }
        catch(err) {
            throw err.message;              
        }
    },

    phonebook: async (args, req) => {
        if(!req.isAuth) {
           throw new Error(errorName.AUTHENTICATION_FAILED);
        }
        try {
            const itemId = args.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }

            const phonebook = await Phonebook.findOne({_id: itemId, Creator: req.id});
            if(!phonebook) {
                throw new Error(errorName.NOT_FOUND_ITEM);
            }

            return phonebook;       
        }
        catch(err) {
            throw err.message;             
        }       
    },

    updatePhonebook: async (req, res, nexdt) => {
        if(!req.isAuth) {
            throw new Error(errorName.AUTHENTICATION_FAILED);
        }
        try {
            const itemId = args.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }

            const phonebook = await Phonebook.findOne({_id: itemId, Creator: req.id});
            if(!phonebook) {
                throw new Error(errorName.NOT_FOUND_ITEM);
            }

            if(args.phonebookInput.name) 
                phonebook.Name = args.phonebookInput.name;
            if(args.phonebookInput.number && args.phonebookInput.number.trim())
                phonebook.Number = args.phonebookInput.number.trim();
            if(args.phonebookInput.group)
                phonebook.group = args.phonebookInput.group;
            if(args.phonebookInput.email && args.phonebookInput.email.trim())
                phonebook.Email = args.phonebookInput.email.trim();
            if(args.phonebookInput.comment)
                phonebook.Comment = args.phonebookInput.comment;
            
            const updatedPhonebook = await phonebook.save();
            return updatedPhonebook;
        }
        catch(err) {
            throw err.message;
        }
    },

    deletePhonebook: async (args, req) => {
        if(!req.isAuth) {
            throw new Error(errorName.AUTHENTICATION_FAILED);
        }
        try {
            const itemId = args.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }

            const deletedPhonebook = await Phonebook.findOneAndDelete({_id: itemId, Creator: req.id});
            if(!deletedPhonebook) {
                throw new Error(errorName.NOT_FOUND_ITEM);
            }

            return deletedPhonebook;    
        }
        catch(err) {
            throw err.message;          
        }
    },

    searchPhonebook: async (args, req) => {
        if(!req.isAuth) {
            throw new Error(errorName.AUTHENTICATION_FAILED);
        }
        try {
            if(!args.phonebookSearchInput.name && !args.phonebookSearchInput.number && !args.phonebookSearchInput.group) {
                throw new Error(errorName.INVALID_JSON_INPUT);
            }

            const name = args.phonebookSearchInput.name?args.phonebookSearchInput.name:'';
            const number = args.phonebookSearchInput.number?args.phonebookSearchInput.number:'';
            const group = args.phonebookSearchInput.group?args.phonebookSearchInput.group:'';

            const nameReg = new RegExp(name.replace(/\s+/g,"\\s+"), "gi");
            const numberReg = new RegExp(number.replace(/\s+/g,"\\s+"), "gi");
            const groupReg = new RegExp(group.replace(/\s+/g,"\\s+"), "gi");

            const phonebooks = await Phonebook.find({$and: [
                {Name: {"$regex": nameReg}},
                {Number: {"$regex": numberReg}},
                {Group: {"$regex": groupReg}},
                {Creator: req.id}
            ]});
            
            return phonebooks;
        }
        catch(err) {
            throw err.message;
        }
    }
}