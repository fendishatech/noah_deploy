const db = require("../../../../helpers/database");
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
    dob: {
      type: DataTypes.DATE,
    },
    total_saving: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Child;
