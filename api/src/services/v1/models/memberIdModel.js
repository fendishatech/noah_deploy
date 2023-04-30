const db = require("../../../helpers/database");
const { DataTypes } = require("sequelize");
const Member = require("./memberModel");

const MemberId = db.define(
  "member_ids",
  {
    id_type: {
      type: DataTypes.ENUM("public", "license", "passport"),
      allowNull: false,
    },
    id_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_img_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Member.hasMany(MemberId, {
  foreignKey: { name: "memberId", allowNull: false },
});
MemberId.belongsTo(Member, {
  foreignKey: { name: "memberId", allowNull: false },
});

module.exports = MemberId;
