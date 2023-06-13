const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    img:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String ,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    dateofJoin:{
        type:Date,
        default:Date.now
    },
})

const User = mongoose.model("User",userSchema);

module.exports = User