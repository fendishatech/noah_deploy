const Sequelize = require("sequelize");
const db = require("../../../helpers/database");
const { DataTypes } = Sequelize;

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
