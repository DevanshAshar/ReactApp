const { createJobApp, getAllJobApps, getJobAppCount, getApplied, getMyApplied, getUpdated } = require('../controllers/jobApp')
const authentication = require('../middleware/auth')

const routes=async(fastify,options)=>{
    fastify.post('/addJobApp',{preHandler:authentication.verifyToken},createJobApp)
    fastify.get('/allJobApp',getAllJobApps)
    fastify.get('/appliedCt/:id',getJobAppCount)
    fastify.get('/getApplied/:id',getApplied)
    fastify.get('/getMyApplied/:id',getMyApplied)
    fastify.post('/updateApp',getUpdated)
}
module.exports=routes