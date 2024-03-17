const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../dbConnect');
const JobApp = require('./jobApp');
const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING,
        unique:true
    },
    password:{
        type:DataTypes.STRING
    }
  },{
    timestamps: false
} 
);
User.hasMany(JobApp, { foreignKey: 'UserId' })
JobApp.belongsTo(User, { foreignKey: 'UserId' });
sequelize.sync({alter:true})
  .then(() => {
    console.log('Database synchronized successfully');
  })
  .catch(error => {
    console.error('Error synchronizing database:', error);
  });
module.exports=User