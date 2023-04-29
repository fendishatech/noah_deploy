const Sequelize = require("sequelize");
const db = require("../../../helpers/database");

const { DataTypes } = Sequelize;

const User = db.define(
  "clients",
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    father_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;
