const Multer=require('fastify-multer')
// const User=require('../models/user')
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});
const storage=Multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,__dirname)
    },
    filename:function(req,file,cb){
        cb(null,'rezume.pdf')
    }
})
var upload=Multer({
    storage:storage
})
let fieldsUpload=upload.single("resume")

const uploadFile=async(req,res)=>{
    console.log(req.file)
}

module.exports={fieldsUpload,uploadFile,Multer}