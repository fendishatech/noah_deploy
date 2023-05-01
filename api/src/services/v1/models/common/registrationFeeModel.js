const db = require("../../../../helpers/database");
const { DataTypes } = require("sequelize");
const Member = require("../memberModel");

const RegistrationFee = db.define(
  "registrationFees",
  {
    status: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
  }
);

Member.hasMany(RegistrationFee, {
  foreignKey: { name: "memberId", allowNull: false },
});
RegistrationFee.belongsTo(Member, {
  foreignKey: { name: "memberId", allowNull: false },
});

module.exports = RegistrationFee;
