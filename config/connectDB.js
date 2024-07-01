 const mongoose = require('mongoose')
require('dotenv').config()


 mongoose.connect(`${process.env.MONGO_URI}`)

 const db = mongoose.connection;

 db.on('error',(err)=>console.log(err))

 db.on('open',()=>console.log(`connect to database`))

 module.exports=db