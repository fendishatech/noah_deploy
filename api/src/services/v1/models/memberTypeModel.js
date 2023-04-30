const db = require("../../../helpers/database");
const Member = require("./memberModel");
const { DataTypes } = require("sequelize");

const MemberType = db.define(
  "member_types",
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

module.exports = MemberType;
