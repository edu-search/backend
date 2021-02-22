const { Sequelize, DataTypes, Model } = require('sequelize');
const dsn = require('../database/db_init');
const sequelize = new Sequelize(dsn.dbname, dsn.user, dsn.password, {
  host: dsn.host,
  dialect: 'mysql',
  timezone: "+08:00"

});

module.exports = faq = sequelize.define("faq", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false

    }, 
    section: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
    question: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    answer: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    tableName: "faq",
    initialAutoIncrement: 1000
})