const db = require("../../../helpers/database");
const { DataTypes } = require("sequelize");

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
