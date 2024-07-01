const express = require('express')
const app = express()
require('dotenv').config()
const cloudinary = require('cloudinary').v2
const mongoose = require('./config/connectDB')
const cookieParser = require('cookie-parser')
const rout = require('./models/route')
const path = require('path')
const PORT = process.env.PORT || 3000
const admin = require('./models/admin')
const upload = require('./config/multer')
const fs = require('fs')


//middle ware thats require....

app.use(cookieParser())
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"static")))

// routs.....

app.get("/",(req,res)=>{
     res.render('login')
})


app.post("/dashboard",isLogind,(req,res)=>{
     res.render('dashboard')// thtas the magic...
})

app.get("/dashboard", async (req,res)=>{
    if(req.cookies.login){  // stored cokkie....
    
     let routs = await rout.find()
     res.render('dashboard',{routs:routs})
    }else{
      res.redirect('/')
    }

})



 // Correct import

    app.post('/upload', upload.single('localImageUrl'), async (req, res) => {
        try {
            let { placeName, date, description, cost, travelTime } = req.body;
        
            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.CLOUD_API_KEY,
                api_secret: process.env.CLOUD_API_SECRECT
            });
    
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                public_id: "hiiiii" // Example public_id, you might want to generate this dynamically
            });
    
    // console.log(uploadResult); // Check upload result
    
        
            const createRoute = await rout.create({
                placeImage: uploadResult.secure_url, // Assuming secure_url is the image URL returned by Cloudinary
                placeName: placeName,
                date: date,
                description: description,
                cost: cost,
                travelTime: travelTime
         });
            //console.log(createRoute);
            res.redirect("/dashboard")

           } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Upload failed' });
          }

    });
    




/// function that authenticate the admin....

async function isLogind(req, res, next) {
     let pass = req.body.pass; // Assuming this is a password
     let email = req.body.email; // Assuming this is an email
 
     try {
         let adminPassword = await admin.findOne({ password: pass });
         let adminEmail = await admin.findOne({ email: email });
 
         if (!adminPassword || !adminEmail) {
             return res.redirect('/');
         }
 
         res.cookie('login', true);
         res.redirect('/dashboard');
     } catch (error) {
         next(error); // Pass any errors to Express error handler
     }
 }
 
 


// Define global error handler middleware
app.use((err, req, res, next) => {
     console.error(err.stack); // Log the error stack trace for debugging
 
     if (err.name === 'UnauthorizedError') {
         res.status(401).json({ error: 'Unauthorized' });
     } else {
         res.status(500).json({ error: 'Internal Server Error' });
     }
 });
 

// server listem ....

app.listen(PORT,()=>{
     console.log(`app listen on ${PORT}`)
})
