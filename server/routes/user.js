const {userRegister, getUsers, userLogin, getParticularUser}=require('../controllers/user')
const authentication = require('../middleware/auth')
const routes=async(fastify,options)=>{
    fastify.post('/newUser',userRegister)
    fastify.get('/allUsers',getUsers)
    fastify.post('/userLogin',userLogin)
    fastify.get('/getParticularUser',{preHandler:authentication.verifyToken},getParticularUser)
}
module.exports=routes