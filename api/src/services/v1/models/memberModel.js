const Sequelize = require("sequelize");
const db = require("../../../helpers/database");
const MemberType = require("./memberTypeModel");

const { DataTypes } = Sequelize;

const Member = db.define(
  "members",
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    father_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    martial_status: {
      type: DataTypes.ENUM("married", "single", "divorced", "widow"),
      allowNull: false,
    },
    family_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    family_males: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    family_females: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    will_list: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

MemberType.hasOne(Member, {
  foreignKey: {
    name: "memberTypeId",
    allowNull: false,
  },
});
Member.belongsTo(MemberType);

module.exports = Member;
