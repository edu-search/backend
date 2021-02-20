const { Sequelize, DataTypes, Model } = require("sequelize");
const dsn = require("../database/db_init");
const sequelize = new Sequelize(dsn.dbname, dsn.user, dsn.password, {
    host: dsn.host,
    dialect: "mysql",
    define: {
        tableName: "email_token",
        timestamps: false,
        createdAt: "create_at",
        updatedAt: "update_at",
    },
});

module.exports = EmailToken = sequelize.define(
    "email_token",
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },

        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        

    },
    {
        // Other model options go here
    }
);
