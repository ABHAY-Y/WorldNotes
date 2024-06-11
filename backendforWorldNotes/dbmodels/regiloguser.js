const mongoose = require('mongoose');
const bluepregiloguser =new mongoose.Schema({
    emailId:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate:/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:20,
    }
})
const UserRegislog = new mongoose.model("RegisteredUser",bluepregiloguser)
module.exports = UserRegislog;