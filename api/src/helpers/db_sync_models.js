const userModel = require("../services/v1/models/userModel");
const clientModel = require("../services/v1/models/clientModel");

// DEV
async function migrate_tables() {
  try {
    if (!userModel) {
      throw new Error("userModel is not defined");
    }
    await userModel.sync();
    await clientModel.sync();
    console.log("Table Migrated Successfully");
    return true;
  } catch (error) {
    console.error("Error synchronizing database:", error);
    return false;
  }
}

module.exports = migrate_tables;
