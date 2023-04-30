const db = require("../../../helpers/database");
const { DataTypes } = require("sequelize");

const Child = db.define(
  "children",
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    father_name: {
      type: DataTypes.STRING,
      unique: true,
    },
    mother_name: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Child;
