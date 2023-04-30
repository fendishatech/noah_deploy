const db = require("../../../helpers/database");
const { DataTypes } = require("sequelize");

const Client = db.define(
  "clients",
  {
    // uuid: {
    // type: Sequelize.UUID,
    // defaultValue: Sequelize.UUIDV1,
    // primaryKey: true
    // },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    father_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Client;
