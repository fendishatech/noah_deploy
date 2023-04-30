const db = require("../../../helpers/database");
const { DataTypes } = require("sequelize");

const SubCity = db.define(
  "sub_cities",
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    woreda: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = SubCity;
