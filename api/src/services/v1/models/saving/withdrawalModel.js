const db = require("../../../../helpers/database");
const { DataTypes } = require("sequelize");
const Member = require("../memberModel");

const Withdrawal = db.define(
  "withdrawals",
  {
    voucher_no: {
      type: DataTypes.STRING,
      unique: true,
      comment: "unique identifier for for the loan transaction",
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
    remaining_amount: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    freezeTableName: true,
  }
);

Member.hasMany(Withdrawal, {
  foreignKey: { name: "memberId", allowNull: false },
});
Withdrawal.belongsTo(Member, {
  foreignKey: { name: "memberId", allowNull: false },
});

module.exports = Withdrawal;
