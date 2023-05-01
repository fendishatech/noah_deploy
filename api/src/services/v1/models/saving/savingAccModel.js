const db = require("../../../../helpers/database");
const { DataTypes } = require("sequelize");
const Member = require("../memberModel");
const Interest = require("../common/interestModel");

const Saving = db.define(
  "savings",
  {
    acc_no: {
      type: DataTypes.STRING,
      unique: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
    total_saving: {
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

Member.hasMany(Saving, {
  foreignKey: { name: "memberId", allowNull: false },
});
Saving.belongsTo(Member, {
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

module.exports = Saving;
