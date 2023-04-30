const userModel = require("../services/v1/models/userModel");
const clientModel = require("../services/v1/models/clientModel");
const cityModel = require("../services/v1/models/cityModel");
const subCityModel = require("../services/v1/models/SubCityModel");
const memberTypeModel = require("../services/v1/models/memberTypeModel");
const memberModel = require("../services/v1/models/memberModel");

// DEV
async function migrate_tables() {
  try {
    if (!userModel) {
      throw new Error("userModel is not defined");
    }
    await userModel.sync();
    await clientModel.sync();
    await cityModel.sync();
    await subCityModel.sync();
    await memberTypeModel.sync();
    await memberModel.sync();
    console.log("Table Migrated Successfully");
    return true;
  } catch (error) {
    console.error("Error synchronizing database:", error);
    return false;
  }
}

module.exports = migrate_tables;
