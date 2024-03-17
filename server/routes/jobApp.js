const { createJobApp, getAllJobApps } = require('../controllers/jobApp')
const authentication = require('../middleware/auth')

const routes=async(fastify,options)=>{
    fastify.post('/addJobApp',{preHandler:authentication.verifyToken},createJobApp)
    fastify.get('/allJobApp',getAllJobApps)
}
module.exports=routes