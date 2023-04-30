const express = require("express");
const clientController = require("./clientController");
const { verifyToken } = require("../../../helpers/authTokens");
const { inputValidation } = require("./clientValidator");

const router = express.Router();

// CLIENT ROUTES
router.post(
  "/clients",
  // verifyToken,
  inputValidation,
  clientController.createClient
);
router.get("/clients/", clientController.findClients);
router.get("/clients/search", clientController.searchClients);
router.get("/clients/:id", clientController.findClient);
router.put("/clients/:id", inputValidation, clientController.updateClient);
router.delete("/clients/:id", clientController.deleteClient);

module.exports = router;
