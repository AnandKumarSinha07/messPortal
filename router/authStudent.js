    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const user = require('../models/user');
    require('dotenv').config()

    const StudentCreation= async(req,res)=>{
        try {   
            const {emailId,studentName,studentRoll,number,password}=req.body;

            if(!emailId || !studentName || !studentRoll || !number || !password){
                throw new Error("Please Enter all the required fields carefully!");
            } 
            
            const hasPassword=await bcrypt.hash(password,10);

            const newStudent = await user({
             studentName:studentName,
             studentRoll:studentRoll,
             emailId:emailId,
             number:number,
             password:hasPassword,   
            }) 

            const savedStudent=await newStudent.save();

            
            console.log("Student",savedStudent)
            const token=jwt.sign({_id:savedStudent._id},process.env.STUDENT_KEY,{expiresIn:"1d"})

            res.cookie("token",token,{
                expires:new Date(Date.now()+8*3600000)
            })

            res.status(200).json({
                msg:"Student created successfully!!",
                data:savedStudent
            })

        } catch (error) {
            console.log('Error in the Student Create Api ',error.message);
            res.status(404).json({
                msg:"Error in the student creation api"
            })
        }
    }

    const loginStudent=async(req,res)=>{
        try {
            const {emailId,password}=req.body;
            if(!emailId || !password){
                return res.status(400).json({
                    msg:"Please Enter the required field!!"
                })
            }
            const findStudent=await user.findOne({emailId});

            if(!findStudent){
                return res.status(404).json({
                    msg:"Not Authrozied Register first!!"
                })
            }

            console.log("student Record ",findStudent);
            const hashPassword=await bcrypt.compare(password, findStudent.password);
            if(!hashPassword){
                return res.status(401).json({
                    msg:"Password Did Not match!!"
                })
            }
           
            const token=jwt.sign({_id:findStudent._id},process.env.STUDENT_KEY,{expiresIn:"1d"})

            res.cookie("token",token,{
                expires:new Date(Date.now()+8*3600000)
            })

            res.status(200).json({
                msg:"Login Successfull!!",
                data:findStudent
            })
            

        } catch (error) {
            console.log('Error in the Login Api ',error.message);
            res.status(500).json({
                msg:"Error in the student Login Api"
            })
        }
    }
    
    const getProfile=async(req,res)=>{
          try {
              return res.status(200).json({
                msg:req.user
              })
          } catch (error) {
              console.log("Error in the get api",error.message)
              return res.status(501).json({
                msg:"Error in the get profile api"
              })
          }
    }


    module.exports={StudentCreation,loginStudent,getProfile};