
const multer  = require('multer')
const crypto = require('crypto')
const path = require('path')

// create disk storage....


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload')
    },
    filename: function (req, file, cb) {
         crypto.randomBytes(12,function(err,name){
             const fileName = name.toString("hex")+path.extname(file.originalname);
             cb(null,fileName)
         })
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload