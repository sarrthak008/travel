
const mongoose = require('mongoose')

const routeSchma = mongoose.Schema({
       placeImage :{
         type:String,
         required:true
       },
        placeName:{
          type:String,
          required:true
        },
       date:{
        type:String,
        require:true
       },
       description:{
        type:String,
        required:true
       },
       cost:{
        type:Number,
        required:true
       },
       travelTime:{
        type:String,
        required:true
       }
       

})

module.exports= mongoose.model("route",routeSchma);