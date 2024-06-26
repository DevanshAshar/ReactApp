const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');

const JobApp = sequelize.define('JobApp', {
    status:{
      type:DataTypes.STRING,
      defaultValue:'under review' //shortlisted,rejected
    }
},{
    timestamps: false
} );
sequelize.sync({alter:true})
  .then(() => {
    console.log('Database synchronized successfully');
  })
  .catch(error => {
    console.error('Error synchronizing database:', error);
});
module.exports = JobApp;