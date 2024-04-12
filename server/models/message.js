const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');
const Job = require('./job');
const User = require('./user');
const Converzation = require('./conversation');
const Message = sequelize.define('Message', {
        sender: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: 'id',
          },
        },
        convoId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: Converzation,
            key: 'id',
          },
        },
        text:{
            type:DataTypes.STRING
        }
},{
    timestamps: false
});
Message.belongsTo(User, { foreignKey: 'sender'});
Message.belongsTo(Converzation, { foreignKey: 'convoId'});
User.hasMany(Message, { foreignKey: 'sender'});
Converzation.hasMany(Message, { foreignKey: 'convoId'});

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });
module.exports = Message;