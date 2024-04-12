const Message=require('../models/message')

const sendMessage = async (req, reply) => {
    try {
      const {convoId, text } = req.body;
      const newMessage = await Message.create({
        sender:userData.id,
        convoId,
        text,
      });  
      const latestMsg = await Message.findOne({
        // where: { UserId: userId },
        order: [['id', 'DESC']]
    });
        if (latestMsg) {
            await latestMsg.destroy();
        }
      reply.code(200).send(newMessage); 
    } catch (error) {
      reply.code(400).send({ message: error.message });
      console.error(error.message);
    }
  };
  const allMessages = async (req, reply) => {
    try {
      const { conversationId } = req.body;
      const messages = await Message.findAll({
        where: {
          convoId:conversationId,
        },
      });
      reply.code(200).send(messages); 
    } catch (error) {
      reply.code(400).send({ message: error.message });
      console.error(error.message);
    }
  };
  
  module.exports = { sendMessage, allMessages };