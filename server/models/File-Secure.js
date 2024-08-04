const mongoose = require("mongoose")

const FileSecureSchema=new mongoose.Schema({
    Name:String,
    Password:String,
    ConfirmPassword:String
})

const FileSecureModel=mongoose.model("Users",FileSecureSchema)

module.exports=FileSecureModel