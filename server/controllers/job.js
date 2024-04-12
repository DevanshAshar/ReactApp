const User=require('../models/user')
const Job=require('../models/job')
const JobApp = require('../models/jobApp')
const { where } = require('sequelize')
const createJob=async(req,res)=>{
    try {
        const {company,role,jd,salary,basedOutOff,workLoc,skills,userId}=req.body
        const job=await Job.create({company,role,UserId:userId,jobDesc:jd,salary:Number(salary),basedOutOff,workLoc,skillsReqd:skills})
        // const latestJob = await Job.findOne({
        //     where: { UserId: userId },
        //     order: [['id', 'DESC']]
        // });
        //     if (latestJob) {
        //         await latestJob.destroy();
        //     }
        res.code(201).send({job})
    } catch (error) {
        res.code(400).send(error.message);
    }
}
const allJobs=async(req,res)=>{
    try {
        const jobs=await Job.findAll({
            where:{
                closed:false
            }
        })
        res.code(200).send(jobs)
    } catch (error) {
        res.code(400).send(error.message);
    }
}
const appliedJobs=async(req,res)=>{
    try {
        const jobs=await JobApp.findAll({
            where:{
                UserId:userData.id
            }
        })
        const jobIds = jobs.map(job => job.JobId);
        res.code(200).send(jobIds)
    } catch (error) {
        res.code(400).send(error.message);
    }
}
const pastPostings=async(req,res)=>{
    try {
        const jobs=await Job.findAll({
            where:{
                UserId:req.params.id
            }
        })
        res.code(200).send(jobs)
    } catch (error) {
        res.code(400).send(error.message);
    }
}
const closeJob=async(req,res)=>{
    try {
        const job=await Job.update(
            {closed:true},
            {where:{
                id:req.params.id
            }}
        )
        res.code(200).send(job)
    } catch (error) {
        res.code(400).send(error.message);
    }
}
const openJob=async(req,res)=>{
    try {
        const job=await Job.update(
            {closed:false},
            {where:{
                id:req.params.id
            }}
        )
        res.code(200).send(job)
    } catch (error) {
        res.code(400).send(error.message);
    }
}
module.exports={createJob,allJobs,appliedJobs,pastPostings,closeJob,openJob}