const {userRegister, getUsers, userLogin, getParticularUser, auth}=require('../controllers/user')
const authentication = require('../middleware/auth')
const routes=async(fastify,options)=>{
    fastify.post('/newUser',userRegister)
    fastify.get('/allUsers',getUsers)
    fastify.post('/userLogin',userLogin)
    fastify.get('/getParticularUser',{preHandler:authentication.verifyToken},getParticularUser)
    fastify.get('/auth',{preHandler:authentication.verifyToken},auth)
}
module.exports=routes