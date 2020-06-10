const mongoose =require('mongoose')
const validator=require('validator')
const PassengerSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    middlename:String,
    lastname:{
        type:String,
        required:true,
        trim:true
    },gender:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true,trim:true
    },
    date:{
        type:Date,
        required:true
    },
    telephone:{
        type:String,
        required:true,
        trim:true
    }
})

module.exports= PassengerSchema