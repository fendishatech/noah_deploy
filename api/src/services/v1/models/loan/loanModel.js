const db = require("../../../../helpers/database");
const { DataTypes } = require("sequelize");

const Loan = db.define(
  "loans",
  {
    acc_no: {
      type: DataTypes.STRING,
      unique: true,
    },
    voucher_no: {
      type: DataTypes.STRING,
      unique: true,
      comment: "unique identifier for for the loan transaction",
    },
    principal_amount: {
      type: DataTypes.DOUBLE,
      comment: "The initial amount of loan",
    },
    duration_mn: {
      type: DataTypes.INTEGER,
      comment: "the total duration of the loan in months.",
    },
    total_principal_paid: {
      type: DataTypes.DOUBLE,
      comment:
        "the amount of paid loan money that eventually increases to principal amount borrowed money",
    },
    total_interest_paid: {
      type: DataTypes.DOUBLE,
      comment:
        "the amount of money that is paid as interest, or accrued interest paid",
    },
    outstanding_balance: {
      type: DataTypes.DOUBLE,
      comment:
        "total amount of money you owe, including accrued interest (remaining_amount + accrued interest)",
    },
    remaining_balance: {
      type: DataTypes.DOUBLE,
      comment:
        "the remaining balance on the loan, difference of the principal and accrued interest (principal_amount - total_principal_paid)",
    },
  },
  {
    freezeTableName: true,
  }
);

Member.hasMany(Loan, {
  foreignKey: { name: "memberId", allowNull: false },
});
Loan.belongsTo(Member, {
  foreignKey: { name: "memberId", allowNull: false },
});

Loan.hasMany(Loan, {
  foreignKey: {
    name: "loanId",
    allowNull: false,
    comment: "The basic loan rate",
  },
});
Loan.belongsTo(Loan, {
  foreignKey: {
    name: "loanId",
    allowNull: false,
    comment: "The basic loan rate",
  },
});

module.exports = Loan;
