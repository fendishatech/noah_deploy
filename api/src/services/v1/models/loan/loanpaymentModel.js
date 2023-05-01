const db = require("../../../../helpers/database");
const { DataTypes } = require("sequelize");

const Loan = require("./loanModel");
const Member = require("../memberModel");

const LoanPayment = db.define(
  "loan_payments",
  {
    amount: {
      type: DataTypes.DOUBLE,
    },
    acquired_interest: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    remaining_balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Member.hasMany(LoanPayment, {
  foreignKey: { name: "memberId", allowNull: false },
});
LoanPayment.belongsTo(Member, {
  foreignKey: { name: "memberId", allowNull: false },
});

Loan.hasMany(LoanPayment, {
  foreignKey: { name: "loanId", allowNull: false },
});
LoanPayment.belongsTo(Loan, {
  foreignKey: { name: "loanId", allowNull: false },
});

module.exports = LoanPayment;
