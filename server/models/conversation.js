const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');
const Job = require('./job');
const User = require('./user');
const Converzation = sequelize.define('Converzation', {
        userId1: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: 'id',
          },
        },
        userId2: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: 'id',
          },
        },
        closed:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
},{
    timestamps: false
});
Converzation.belongsTo(User, { foreignKey: 'userId1', as: 'user1' });
Converzation.belongsTo(User, { foreignKey: 'userId2', as: 'user2' });
User.hasMany(Converzation, { foreignKey: 'userId1', as: 'conversations1' });
User.hasMany(Converzation, { foreignKey: 'userId2', as: 'conversations2' });

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });
module.exports = Converzation;