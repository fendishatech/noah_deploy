const db = require("../../../helpers/database");
const { DataTypes } = require("sequelize");

const Member = require("./memberModel");

const MemberLots = db.define(
  "member_lots",
  {
    purchased: {
      type: DataTypes.INTEGER,
    },
    promised: {
      type: DataTypes.INTEGER,
    },
    balance: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    freezeTableName: true,
  }
);

Member.hasOne(MemberLots, {
  foreignKey: { name: "memberId", allowNull: false },
});
MemberLots.belongsTo(Member, {
  foreignKey: { name: "memberId", allowNull: false },
});

module.exports = MemberLots;
