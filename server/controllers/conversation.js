const Converzation=require('../models/conversation')
const User=require('../models/user')
const {Op}=require('sequelize')
const createConvo=async(req,res)=>{
    try {
        const { userId} = req.body;
        const existingConversation = await Converzation.findOne({
            where: {
                [Op.or]: [
                    { userId1:userData.id,
                        userId2:userId },
                    { userId1:userId,
                        userId2:userData.id }
                  ]
            }
        });
        if (existingConversation) {
            return res.code(201).send(existingConversation);
        }
        const newConversation = await Converzation.create({
            userId1:userData.id,
            userId2:userId
          });
          const latestConvo = await Converzation.findOne({
            // where: { UserId: userId },
            order: [['id', 'DESC']]
        });
            if (latestConvo) {
                await latestConvo.destroy();
            }
          return res.code(201).send(newConversation);
    } catch (error) {
        res.code(400).send(error.message);
    }
}
const convoByUser=async(req,res)=>{
    try {
        // const {userId}=req.body;
        const conversations = await Converzation.findAll({
            where: {
              [Op.or]: [
                { userId1: userData.id },
                { userId2: userData.id }
              ]
            }
          });
          res.code(200).send(conversations)
    } catch (error) {
        res.code(400).send(error.message);
    }
}
const convoBy2User = async (req, res) => {
    const { userId1, userId2 } = req.body;
  
    try {
      const conversations = await Converzation.findAll({
        where: {
          [Op.or]: [
            {
              [Op.and]: [
                { userId1: userId1 },
                { userId2: userId2 }
              ]
            },
            {
              [Op.and]: [
                { userId1: userId2 },
                { userId2: userId1 }
              ]
            }
          ]
        },
        // include: [
        //   { model: User, as: 'user1' },
        //   { model: User, as: 'user2' }
        // ]
      });
      res.code(200).send(conversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      res.code(500).send({ error: error.message });
    }
  };
  const closeChat=async(req,res)=>{
    try {
        const convo=await Converzation.update(
            {closed:true},
            {where:{
                id:req.params.id
            }}
        )
        res.code(200).send(convo)
    } catch (error) {
        console.error('Error fetching conversations:', error);
      res.code(500).send({ error: error.message });
    }
  }
  const openChat=async(req,res)=>{
    try {
        const convo=await Converzation.update(
            {closed:false},
            {where:{
                id:req.params.id
            }}
        )
        res.code(200).send(convo)
    } catch (error) {
        console.error('Error fetching conversations:', error);
      res.code(500).send({ error: error.message });
    }
  }
module.exports={createConvo,convoByUser,convoBy2User,closeChat,openChat}