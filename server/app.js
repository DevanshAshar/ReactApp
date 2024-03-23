const fastify = require('fastify')({logger:true})
const fastifyCookie = require('@fastify/cookie');
const fastifyPassport = require('fastify-passport');
const fastifySecureSession = require('@fastify/secure-session')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const dotenv = require('dotenv').config();
const fs = require('fs')
const path = require('path')
const cors = require('fastify-cors')
const crypto = require('crypto');
require('./dbConnect')
fastify.register(cors, {});

//////////////////
fastify.register(fastifySecureSession, {
  key: fs.readFileSync(path.join(__dirname,'not-so-secret-key')),
  cookie: {
      path: '/'
  }
})

fastify.register(fastifyPassport.initialize())
fastify.register(fastifyPassport.secureSession())

fastifyPassport.use('google', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback"
}, function (accessToken,refreshToken,profile,cb) {
  cb(undefined, profile)
}
))
fastifyPassport.use('linkedin', new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/linkedin/callback",
  scope: ['r_liteprofile', 'r_emailaddress']
}, function (accessToken, refreshToken, profile, cb) {
  cb(undefined, profile);
}));

fastifyPassport.registerUserDeserializer(async(user,req) => {
  return user
})

fastifyPassport.registerUserSerializer(async(user,req) => {
  return user
})

fastify.get('/auth/google/callback',
    {preValidation: fastifyPassport.authenticate('google',{scope:['profile','email']})},
    async (req,res) => {
      const sessionId = req.cookies['session'];
      const user=req.user
      const checkUser=await User.findOne({
        where:{
            email:user.emails[0].value
        }
    });
    if(!checkUser)
    {  const register = await User.create({
        firstName:user.name.givenName,
        lastName:user.name.familyName,
        username:user.displayName,
        email:user.emails[0].value
    });
    await register.save();}
      res.redirect(`http://localhost:3000?token=${sessionId}`);
    }
)
fastify.get('/auth/linkedin/callback',
  { preValidation: fastifyPassport.authenticate('linkedin', { scope: ['r_liteprofile', 'r_emailaddress'] }) },
  async (req, res) => {
    res.redirect('http://localhost:3000/');
  }
);

fastify.get('/login', fastifyPassport.authenticate('google', {scope: ['profile','email']}))
fastify.get('/login/linkedin', fastifyPassport.authenticate('linkedin', { scope: ['r_liteprofile', 'r_emailaddress'] }));

fastify.get('/logout',
    async(req,res) => {
        req.logout()
        return {success:true}
    }
)

///////////////


const userRoutes=require('./routes/user')
const jobRoutes=require('./routes/job')
const jobAppRoutes=require('./routes/jobApp');
const User = require('./models/user');

fastify.register(userRoutes,{ prefix: "/user" })
// fastify.register(authRoutes)
fastify.register(jobRoutes,{prefix:'/job'})
fastify.register(jobAppRoutes,{prefix:'/jobApp'})

fastify.listen({ port: 8080 }, (err) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
})