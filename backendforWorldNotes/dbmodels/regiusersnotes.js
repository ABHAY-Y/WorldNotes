const mongoose = require('mongoose');
const registerusernotes =new mongoose.Schema({
    notenumber:{type:Number},
    pswd:{type:String},
    emailaddress:{type:String},
    notetitle:{type:String},
    note:{type:String}
})
const RegisterNotes = new mongoose.model("RegisterUserNote",registerusernotes)
module.exports = RegisterNotes;