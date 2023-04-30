const express = require("express");
const cityController = require("../controllers/cityController");
const { verifyToken } = require("../../../../helpers/authTokens");
const { inputValidation } = require("../validators/cityValidator");

const router = express.Router();

// CITY ROUTES
router.post(
  "/cities",
  // verifyToken,
  inputValidation,
  cityController.createCity
);
router.get("/cities/", cityController.findCities);
router.get("/cities/search", cityController.searchCities);
router.get("/cities/:id", cityController.findCity);
router.put("/cities/:id", inputValidation, cityController.updateCity);
router.delete("/cities/:id", cityController.deleteCity);

module.exports = router;
