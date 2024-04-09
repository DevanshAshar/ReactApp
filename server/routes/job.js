const { allJobs } = require('../controllers/JOB.JS')
const { pastPostings } = require('../controllers/JOB.JS')
const { appliedJobs } = require('../controllers/JOB.JS')
const { createJob } = require('../controllers/JOB.JS')
const authentication = require('../middleware/auth')

const routes=async(fastify,options)=>{
    fastify.post('/createJob',createJob)  
    fastify.get('/allJobs',{preHandler:authentication.verifyToken},allJobs)
    fastify.get('/appliedJobs',{preHandler:authentication.verifyToken},appliedJobs)
    fastify.get('/pastPostings/:id',pastPostings)
}
module.exports=routes