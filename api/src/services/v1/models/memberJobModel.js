const db = require("../../../helpers/database");
const { DataTypes } = require("sequelize");
const Member = require("./memberModel");

const MemberJob = db.define(
  "member_jobs",
  {
    title: {
      type: DataTypes.STRING,
    },
    exp_year: {
      type: DataTypes.INTEGER,
    },
    exp_month: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

Member.hasMany(MemberJob, {
  foreignKey: { name: "memberId", allowNull: false },
});
MemberJob.belongsTo(Member, {
  foreignKey: { name: "memberId", allowNull: false },
});

module.exports = MemberJob;
