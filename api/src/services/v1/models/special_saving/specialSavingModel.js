const db = require("../../../../helpers/database");
const { DataTypes } = require("sequelize");
const Member = require("../memberModel");
const Interest = require("../common/interestModel");

const SpecialSaving = db.define(
  "specialSavings",
  {
    acc_no: {
      type: DataTypes.STRING,
      unique: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
    duration: {
      type: DataTypes.INTEGER,
      comment: "Total time that the specialSaving money should be returned in.",
    },
  },
  {
    freezeTableName: true,
    comment: "SpecialSaving account of a member",
  }
);

Member.hasMany(SpecialSaving, {
  foreignKey: { name: "memberId", allowNull: false },
});
SpecialSaving.belongsTo(Member, {
  foreignKey: { name: "memberId", allowNull: false },
});

Interest.hasMany(Interest, {
  foreignKey: {
    name: "interestId",
    allowNull: false,
    comment: "The basic interest rate",
  },
});
Interest.belongsTo(Interest, {
  foreignKey: {
    name: "interestId",
    allowNull: false,
    comment: "The basic interest rate",
  },
});

module.exports = SpecialSaving;
