const mongoose=require('mongoose')
require('dotenv').config()

const dbConnect=async()=>{
   try {
         await mongoose.connect(process.env.LOCAL_MONGODB)
   } catch(error) {
      console.log('Error in the database connection')
   }
}


module.exports=dbConnect;