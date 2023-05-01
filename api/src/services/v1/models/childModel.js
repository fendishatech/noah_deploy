const db = require("../../../helpers/database");
const { DataTypes } = require("sequelize");

const Child = db.define(
  "children",
  {
    first_name: {
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
    payment: {
      type: DataTypes.DOUBLE,
      unique: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Child;
