const db = require("../../../../helpers/database");
const { DataTypes } = require("sequelize");

const Member = require("../memberModel");

const LoanRequest = db.define(
  "loan_requests",
  {
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    duration_mn: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "denied"),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

// relations member id, subMember id and member id
Member.hasMany(LoanRequest, {
  foreignKey: { name: "memberId", allowNull: false },
});
LoanRequest.belongsTo(Member, {
  foreignKey: { name: "memberId", allowNull: false },
});

module.exports = LoanRequest;
