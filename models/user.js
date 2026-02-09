const mongoose=require('mongoose')
const validator = require('validator');

const userSchema=new mongoose.Schema({
    studentName:{
        type:String,
        required:true,
        trim:true
    },

    studentRoll:{
        type:String,
        required:true
    },

    emailId:{
         type:String,
         required:true,
        

          validate(value){
             if(!validator.isEmail(value)){
             throw new Error("Invalid email address"+value)
           }
        }
         
    },
   
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:8,
        maxLength:20,
        validate(value){
            if(!validator.isStrongPassword(value)){
                 throw new Error("please enter some strong password")
            }
        }
    },

     number:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },

    bankAccount:{
        type:String,
        trim:true,
        unique:true,
        required:true,
    },
    ifsc:{
        type:String,
        trim:true,
        unique:true,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://www.wisden.com/static-assets/images/players/3852.png?v=23.77",
         validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid url")
            }
        },
        trim:true
    }
},{timestamps:true})

const user=mongoose.model("User",userSchema);
module.exports=user;