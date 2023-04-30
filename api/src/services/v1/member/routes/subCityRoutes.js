const express = require("express");
const subCityController = require("../controllers/subCityController");
const { verifyToken } = require("../../../../helpers/authTokens");
const { inputValidation } = require("../validators/subCityValidator");

const router = express.Router();

// subCITY ROUTES
router.post(
  "/sub_cities",
  // verifyToken,
  inputValidation,
  subCityController.createSubCity
);
router.get("/sub_cities/", subCityController.findSubCities);
router.get("/sub_cities/search", subCityController.searchSubCities);
router.get("/sub_cities/:id", subCityController.findSubCity);
router.put("/sub_cities/:id", inputValidation, subCityController.updateSubCity);
router.delete("/sub_cities/:id", subCityController.deleteSubCity);

module.exports = router;
