const { createJob } = require('../controllers/JOB.JS')
const authentication = require('../middleware/auth')

const routes=async(fastify,options)=>{
    fastify.post('/createJob',{preHandler:authentication.verifyToken},createJob)  
}
module.exports=routes