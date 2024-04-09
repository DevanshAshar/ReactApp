const {userRegister, getUsers, userLogin, getParticularUser, auth, updateUser, uploadRezume}=require('../controllers/user')
const authentication = require('../middleware/auth')
const multer = require('fastify-multer');
const { fieldsUpload, uploadFile } = require('../middleware/multer');
const upload = multer({ dest: 'uploads/' });
const routes=async(fastify,options)=>{
    fastify.post('/newUser',userRegister)
    fastify.get('/allUsers',getUsers)
    fastify.post('/userLogin',userLogin)
    fastify.get('/getParticularUser',{preHandler:authentication.verifyToken},getParticularUser)
    fastify.get('/auth',{preHandler:authentication.verifyToken},auth)
    fastify.post('/updateDetails',{preHandler:authentication.verifyToken},updateUser)
    fastify.post('/uploadRezume',{preHandler:[authentication.verifyToken,fieldsUpload]},uploadRezume)
}
module.exports=routes