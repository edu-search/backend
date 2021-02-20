var mysql = require('mysql2');
const { Sequelize } = require('sequelize');


//modify .env file to run on your own local server
var dsn = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dbname: process.env.DB_NAME
    }
    
    const con = mysql.createConnection({
        user: dsn.user,
        password: dsn.password,
        host: dsn.host,
        port: dsn.port,
        
    });
    
    con.connect((err) => {
        if (err) {
            throw err;
        }
        console.log("MySQL Connection successful");
    });

const sequelize = new Sequelize( dsn.dbname, dsn.user, dsn.password, {
    host: dsn.host,
    dialect: 'mysql'
  });

  module.exports = dsn;

  try {
    sequelize.authenticate();
    console.log('Connection by sequelize has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }