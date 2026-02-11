
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const Admin = require('../models/admin');
require('dotenv').config()

const StudentMiddleware=async(req,res,next)=>{
    const {token}=req.cookies;
    console.log("token",token)
    if(!token){
        return res.status(404).json({
            msg:`Token Not Generated!!`
        
        })
    }
    const decodeToken= jwt.verify(token,process.env.STUDENT_KEY);
    console.log("decodeToken",decodeToken);
    console.log("id is",decodeToken._id)
    const findStudent=await user.findById(decodeToken._id);
    console.log("student is",findStudent)
    req.user=findStudent;
    next();
}

const AdminMiddleware=async(req,res,next)=>{
    const {token}=req.cookies;
    console.log("token",token)
    if(!token){
        return res.status(404).json({
            msg:`Token Not Generated!!`
        
        })
    }
    const decodeToken= jwt.verify(token,process.env.STUDENT_KEY);
    console.log("decodeToken",decodeToken);
    console.log("id is",decodeToken._id)
    const findAdmin=await Admin.findById(decodeToken._id);
    console.log("student is",findAdmin)
    req.user=findAdmin;
    next();
}

module.exports={StudentMiddleware,AdminMiddleware};