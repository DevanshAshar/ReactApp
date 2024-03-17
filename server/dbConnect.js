const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, 'postgres', process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
  });
const connect=async()=>{
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connect()
module.exports=sequelize