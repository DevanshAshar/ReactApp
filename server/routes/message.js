const { sendMessage, allMessages } = require('../controllers/message')
const authentication = require('../middleware/auth')

const routes=async(fastify,options)=>{
    fastify.post('/sendMsg',{preHandler:authentication.verifyToken},sendMessage)
    fastify.post('/allMsgs',{preHandler:authentication.verifyToken},allMessages)
}
module.exports=routes