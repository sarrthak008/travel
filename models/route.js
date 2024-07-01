
const mongoose = require('mongoose')

const routeSchma = mongoose.Schema({
       placeImage :{
         type:String,
         required:true
       },
       date:{
        type:String,
        require:true
       },
       discription:{
        type:String,
        required:true
       },
       cost:{
        type:Number,
        required:true
       },
       trvelTime:{
        type:String,
        required:true
       }

})

module.exports= mongoose.model("route",routeSchma);