const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize("tasks", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

module.exports = { sequelize };