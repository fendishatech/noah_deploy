const db = require("../../../../helpers/database");
const { DataTypes } = require("sequelize");

const Saving = require("./savingModel");
const Member = require("../memberModel");

const SavingDeposit = db.define(
  "saving_deposits",
  {
    amount: {
      type: DataTypes.DOUBLE,
    },
    duration: {
      type: DataTypes.DOUBLE,
      comment: "How much time in months the paid amounts accounts for",
    },
    voucher_no: {
      type: DataTypes.STRING,
      unique: true,
      comment: "unique identifier for for the saving deposit transaction",
    },
  },
  {
    freezeTableName: true,
  }
);

Member.hasMany(SavingDeposit, {
  foreignKey: { name: "memberId", allowNull: false },
});
SavingDeposit.belongsTo(Member, {
  foreignKey: { name: "memberId", allowNull: false },
});

Saving.hasMany(SavingDeposit, {
  foreignKey: { name: "savingId", allowNull: false },
});
SavingDeposit.belongsTo(Saving, {
  foreignKey: { name: "savingId", allowNull: false },
});

module.exports = SavingDeposit;
