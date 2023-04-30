const userModel = require("../services/v1/models/userModel");
const clientModel = require("../services/v1/models/clientModel");
const cityModel = require("../services/v1/models/cityModel");
const subCityModel = require("../services/v1/models/subCityModel");
const memberModel = require("../services/v1/models/memberModel");
const memberTypeModel = require("../services/v1/models/memberTypeModel");

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
    await memberModel.sync();
    await memberTypeModel.sync();
    console.log("Table Migrated Successfully");
    return true;
  } catch (error) {
    console.error("Error synchronizing database:", error);
    return false;
  }
}

module.exports = migrate_tables;
