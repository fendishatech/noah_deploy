const db = require("../../../helpers/database");
const { DataTypes } = require("sequelize");
const City = require("./cityModel");
const SubCity = require("./subCityModel");
const Member = require("./memberModel");

const MemberEC = db.define(
  "emergency_contact",
  {
    first_name: {
      type: DataTypes.STRING,
    },
    middle_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    woreda: {
      type: DataTypes.INTEGER,
    },
    house_no: {
      type: DataTypes.INTEGER,
    },
    phone_no: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

// relations city id, subCity id and member id
City.hasMany(MemberEC, {
  foreignKey: { name: "cityId", allowNull: false },
});
MemberEC.belongsTo(City, {
  foreignKey: { name: "cityId", allowNull: false },
});

SubCity.hasMany(MemberEC, {
  foreignKey: { name: "subCityId", allowNull: false },
});
MemberEC.belongsTo(SubCity, {
  foreignKey: { name: "subCityId", allowNull: false },
});

Member.hasOne(MemberEC, {
  foreignKey: { name: "memberId", allowNull: false },
});
MemberEC.belongsTo(Member, {
  foreignKey: { name: "memberId", allowNull: false },
});

module.exports = MemberEC;
