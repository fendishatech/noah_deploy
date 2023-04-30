const db = require("../../../helpers/database");
const { DataTypes } = require("sequelize");

const MemberEdu = db.define("member_edu", {
  name: DataTypes.STRING,
});

module.exports = MemberEdu;
