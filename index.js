
const express = require('express')
const dbConnect = require('./config/db')
const controller=require('./controller/controller')
var cookieParser = require('cookie-parser')


const app = express()
require('dotenv').config()
const PORT = process.env.PORT


app.use(express.json());
app.use(cookieParser())

app.get('/',(req,res)=>{
     res.send('Hello World!!')  
})

app.use('/api',controller)


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