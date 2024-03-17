const fastify = require('fastify')({logger:true})
const dotenv = require('dotenv').config();
require('./dbConnect')
// fastify.register(require('fastify-cors'));
fastify.get('/', function handler (request, reply) {
    reply.send({ test: 'working' })
})


const userRoutes=require('./routes/user')
const jobRoutes=require('./routes/job')
const jobAppRoutes=require('./routes/jobApp')

fastify.register(userRoutes,{ prefix: "/user" })
fastify.register(jobRoutes,{prefix:'/job'})
fastify.register(jobAppRoutes,{prefix:'/jobApp'})

fastify.listen({ port: 5000 }, (err) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
})