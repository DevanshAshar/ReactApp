const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../dbConnect');
const JobApp = require('./jobApp');
const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING,
        // unique:true
    },
    password:{
        type:DataTypes.STRING
    },
    mobile:{
        type:DataTypes.BIGINT
    },
    resume:{
        type:DataTypes.STRING
    },
    role:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    },
    skills:{
        type:DataTypes.ARRAY(DataTypes.STRING)
    },
    detailsFilled:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
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