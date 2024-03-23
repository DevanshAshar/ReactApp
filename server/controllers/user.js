const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('../models/user')
const userRegister = async(req,res) => {
    try{
        const {firstName,lastName,username,email,password,role}=req.body
        const register = await User.create({
            firstName:firstName,
            lastName:lastName,
            username:username,
            email:email,
            password:await bcrypt.hash(password,9),
            role:role
        });
        await register.save();
        const token = jwt.sign({id:data.id},process.env.SECRET_KEY);
        res.code(200).send({message:'Success',user:register,token:token});
    }catch(err){
        res.code(400).send(err.message);
    }
};
const userLogin=async(req,res)=>{
    try {
        const {email,password}=req.body
        const data = await User.findOne({
            where:{
                email:email
            }
        });
        if(data){
            const password_valid = await bcrypt.compare(password,data.password);
            if(password_valid){
                const token = jwt.sign({id:data.id},process.env.SECRET_KEY);
                res.status(200).send({user:data,token: token});
            }else{
                res.status(400).send({message:'Incorrect password'});
            }
        }else{
            res.status(400).send({message:'Please register first'});
        }
    } catch (error) {
        res.code(400).send(error.message);
    }
}
const auth = async (req, res) => {
    try {
      res.status(200).send({ user: userData });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
const getParticularUser=async(req,res)=>{
    try {
        // console.log(userData)
        const data=await User.findOne({
            where:{
                id:userData.id
            }
        })
        return res.code(200).send(data)
    } catch (error) {
        res.code(400).send(err.message);
    }
}
const getUsers=async(req,res)=>{
    try {
        const users = await User.findAll();
        res.code(200).send(users);
    } catch (error) {
        res.code(400).send(err.message);
    }
}

module.exports={userRegister,getUsers,userLogin,getParticularUser,auth}