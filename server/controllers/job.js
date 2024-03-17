const User=require('../models/user')
const Job=require('../models/job')
const createJob=async(req,res)=>{
    try {
        const {company,role}=req.body
        const job=await Job.create({company,role,UserId:userData.id})
        res.code(201).send({job})
    } catch (error) {
        res.code(400).send(error.message);
    }
}
module.exports={createJob}