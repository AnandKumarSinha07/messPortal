
const express = require('express')
const dbConnect = require('./config/db')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT

app.get('/',(req,res)=>{
     res.send('Hello World!!')  
})


dbConnect()
  .then(() => {
    console.log("conedcted to the database");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} `);
    });
  })
  .catch((error) => {
    console.log("error in the code", error);
  });