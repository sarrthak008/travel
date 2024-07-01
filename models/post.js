
const mongoose = require('mongoose')

const userSchma = mongoose.Schema({
      travelImage:{
         type:String,
         required:true
      },
      info:{
        type:String,
        required:true
      }
      
})

module.exports = mongoose.model("user",userSchma);