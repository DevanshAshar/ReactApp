const { createConvo, convoByUser, convoBy2User, closeChat, openChat } = require('../controllers/conversation')
const authentication = require('../middleware/auth')

const routes=async(fastify,options)=>{
    fastify.post('/createConvo',{preHandler:authentication.verifyToken},createConvo)
    fastify.get('/convoByUser',{preHandler:authentication.verifyToken},convoByUser)
    fastify.post('/convoBy2User',convoBy2User)
    fastify.post('/closeChat/:id',{preHandler:authentication.verifyToken},closeChat)
    fastify.post('/openChat/:id',{preHandler:authentication.verifyToken},openChat)
}
module.exports=routes