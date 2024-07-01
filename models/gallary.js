
const mongoose = require('mongoose')

const gallaryImageSchma = mongoose.Schema({
      travelImage:{
         type:String,
         required:true
      },
      info:{
        type:String,
        required:true
      }
      
})

module.exports = mongoose.model("gallarySchma",gallaryImageSchma);