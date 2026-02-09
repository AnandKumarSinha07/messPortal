const mongoose=require('mongoose')
require('dotenv').config()

const dbConnect=async()=>{
   try {
         await mongoose.connect(process.env.MONGODB)
   } catch(error) {
      console.log('Error in the database connection')
   }
}


module.exports=dbConnect;