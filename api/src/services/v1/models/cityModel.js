const Sequelize = require("sequelize");
const db = require("../../../helpers/database");
const { DataTypes } = Sequelize;

const City = db.define(
  "cities",
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = City;
