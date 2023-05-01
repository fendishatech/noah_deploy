const db = require("../../../../helpers/database");
const { DataTypes } = require("sequelize");

const SpecialSaving = require("./specialSavingModel");
const Member = require("../memberModel");

const SpecialSavingDeposit = db.define(
  "SpecialSaving_deposits",
  {
    amount: {
      type: DataTypes.DOUBLE,
    },
    voucher_no: {
      type: DataTypes.STRING,
      unique: true,
      comment:
        "unique identifier for for the SpecialSaving deposit transaction",
    },
  },
  {
    freezeTableName: true,
  }
);

Member.hasMany(SpecialSavingDeposit, {
  foreignKey: { name: "memberId", allowNull: false },
});
SpecialSavingDeposit.belongsTo(Member, {
  foreignKey: { name: "memberId", allowNull: false },
});

SpecialSaving.hasMany(SpecialSavingDeposit, {
  foreignKey: { name: "SpecialSavingId", allowNull: false },
});
SpecialSavingDeposit.belongsTo(SpecialSaving, {
  foreignKey: { name: "SpecialSavingId", allowNull: false },
});

module.exports = SpecialSavingDeposit;
