const mongoose=require('mongoose');
const validator = require('validator');

const adminSchema=new mongoose.Schema({
     emailId:{
        type:String,
        required:true,
        trim:true,
        unique:true,
         validate(value){
           if(!validator.isEmail(value)){
             throw new Error("Invalid email address"+value)
           }
        }
     },
     firstName:{
        type:String,
        trim:true,
        required:true,
     },
     lastName:{
        type:String,
        trim:true,
        required:true,
     },
     password:{
        type:String,
        required:true,
        minLength:8,
        trim:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                 throw new Error("please enter some strong password")
            }
        }
     },
     adminType:{
        type:[String],
        enum:["Warden","Mess Owner","Mess Secretary"]
     }
},{timestamps:true})

const Admin=mongoose.model("Admin",adminSchema);
module.exports=Admin;