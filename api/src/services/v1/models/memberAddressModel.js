const db = require("../../../helpers/database");
const { DataTypes } = require("sequelize");

const City = require("./cityModel");
const SubCity = require("./subCityModel");
const Member = require("./memberModel");

const MemberAddress = db.define(
  "member_addresses",
  {
    woreda: {
      type: DataTypes.INTEGER,
    },
    houseNo: {
      type: DataTypes.INTEGER,
    },
    placeName: {
      type: DataTypes.STRING,
    },
    phoneNo2: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

// relations city id, subCity id and member id
City.hasMany(MemberAddress, {
  foreignKey: { name: "cityId", allowNull: false },
});
MemberAddress.belongsTo(City, {
  foreignKey: { name: "cityId", allowNull: false },
});

SubCity.hasMany(MemberAddress, {
  foreignKey: { name: "subCityId", allowNull: false },
});
MemberAddress.belongsTo(SubCity, {
  foreignKey: { name: "subCityId", allowNull: false },
});

Member.hasOne(MemberAddress, {
  foreignKey: { name: "memberId", allowNull: false },
});
MemberAddress.belongsTo(Member, {
  foreignKey: { name: "memberId", allowNull: false },
});

module.exports = MemberAddress;
