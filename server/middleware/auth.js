const jwt = require('jsonwebtoken')
const User=require('../models/user')
const authentication={
    verifyToken:async (req, res, next) => {
        try {
            const token = req.headers['authorization'];
            if (!token) {
                return res.status(401).send({ error: 'Unauthorized' });
            }   
            try {
                const data = jwt.verify(token, process.env.SECRET_KEY);
                const user = await User.findOne({ where:{id: data.id} });
                if (!user) {
                    return res.status(401).send({ error: 'Unauthorized' });
                }
                userData = user;
                next();
            } catch (error) {
                return res.status(400).send({ error: error.message });
            }
        } catch (error) {
            return res.status(500).send({ error: 'Internal Server Error' });
        }
}
}
module.exports=authentication