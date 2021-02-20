const { Sequelize, DataTypes, Model } = require('sequelize');
const dsn = require('../database/db_init');
const sequelize = new Sequelize(dsn.dbname, dsn.user, dsn.password, {
  host: dsn.host,
  dialect: 'mysql',
  define: {
    tableName: "users",
    timestamps: false,
    createdAt: "create_at",
    updatedAt: "update_at",
  },
});

module.exports = User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  access_token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  access_token_create_at: {
    type: DataTypes.TIME,
    allowNull: true
  },
  create_at: {
    type: DataTypes.TIME,
    allowNull: true
  },
  update_at: {
    type: DataTypes.TIME,
    allowNull: true
  },
  avatar: {
    type: DataTypes.TEXT,
    allowNull: true
  }

}, {
  timestamps: false
  // Other model options go here
});


// the defined model is the class itself
//console.log(User === sequelize.models.User); // true


//module.exports = test_user = User.create({username: "testname", password: "testpassword", email: "test@email.com"});