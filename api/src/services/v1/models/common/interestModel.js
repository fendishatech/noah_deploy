const db = require("../../../../helpers/database");
const { DataTypes } = require("sequelize");

const Interest = db.define(
  "interests",
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    percentage: {
      type: DataTypes.DOUBLE,
      unique: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Interest;
