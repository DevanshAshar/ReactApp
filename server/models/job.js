const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../dbConnect');
const JobApp = require('./jobApp');
const User=require('./user')
const Job= sequelize.define('Job', {
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING
    }
  },{
    timestamps: false
} 
);
User.hasMany(Job,{foreignKey:'UserId'})
Job.belongsTo(User,{foreignKey:'UserId'})
Job.hasMany(JobApp, { foreignKey: 'JobId' })
JobApp.belongsTo(Job, { foreignKey: 'JobId' })
sequelize.sync({alter:true})
  .then(() => {
    console.log('Database synchronized successfully');
  })
  .catch(error => {
    console.error('Error synchronizing database:', error);
});
module.exports=Job