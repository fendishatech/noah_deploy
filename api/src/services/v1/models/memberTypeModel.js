const Sequelize = require("sequelize");
const db = require("../../../helpers/database");
const { DataTypes } = Sequelize;

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
