const db = require("../../../helpers/database");
const { DataTypes } = require("sequelize");

const City = require("./cityModel");
const SubCity = require("./subCityModel");
const Child = require("./childModel");

const ChildAddress = db.define(
  "child_addresses",
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

// relations city id, subCity id and child id
City.hasMany(ChildAddress, {
  foreignKey: { name: "cityId", allowNull: false },
});
ChildAddress.belongsTo(City, {
  foreignKey: { name: "cityId", allowNull: false },
});

SubCity.hasMany(ChildAddress, {
  foreignKey: { name: "subCityId", allowNull: false },
});
ChildAddress.belongsTo(SubCity, {
  foreignKey: { name: "subCityId", allowNull: false },
});

Child.hasOne(ChildAddress, {
  foreignKey: { name: "childId", allowNull: false },
});
ChildAddress.belongsTo(Child, {
  foreignKey: { name: "childId", allowNull: false },
});

module.exports = ChildAddress;
