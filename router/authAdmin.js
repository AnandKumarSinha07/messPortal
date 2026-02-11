const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require("../models/admin");
require('dotenv').config()

const AdminRegistration=async (req, res) => {
  try {
    const { emailId, firstName, lastName, adminType, password } = req.body;

    if (!emailId || !firstName || !lastName || !adminType || !password) {
      throw new Error("Please Enter all the required fields carefully!!");
    }

    const hasPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      adminType: adminType,
      password: hasPassword,
    });

    console.log("newAdmin", newAdmin);
    const token = jwt.sign({ _id: newAdmin._id },process.env.ADMIN_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).json({
      msg: "Admin created successfully!!",
      data: newAdmin,
    });
  } catch (error) {
    console.log("Error in the Admin Create Api ", error.message);
    res.status(501).json({
      msg: "Error in the Admin creation api",
    });
  }
}


const LoginAdmin=async(req,res)=>{
     try {
            const {emailId,password}=req.body;
            if(!emailId || !password){
                return res.status(400).json({
                    msg:"Please Enter the required field!!"
                })
            }
            const findAdmin=await Admin.findOne({emailId});

            if(!findAdmin){
                return res.status(404).json({
                    msg:"Not Authrozied Register first!!"
                })
            }

            console.log("Admin Record ",findAdmin);
            const hashPassword=await bcrypt.compare(password, findAdmin.password);
            if(!hashPassword){
                return res.status(401).json({
                    msg:"Password Did Not match!!"
                })
            }

        
            const token=jwt.sign({_id:findAdmin._id},process.env.ADMIN_KEY,{expiresIn:"1d"})

            res.cookie("token",token,{
                expires:new Date(Date.now()+8*3600000)
            })

            res.status(200).json({
                msg:"Login Successfull!!",
                data:findAdmin
            })
            

        } catch (error) {
            console.log('Error in the Login Api ',error.message);
            res.status(500).json({
                msg:"Error in the Admin Login Api"
            })
        }
}
module.exports = {AdminRegistration,LoginAdmin}
