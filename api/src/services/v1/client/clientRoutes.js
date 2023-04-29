const express = require("express");
const clientController = require("./clientController");
const { verifyToken } = require("../../../helpers/verifyToken");
const { inputValidation } = require("./clientValidator");

const router = express.Router();

// CLIENT ROUTES
router.post(
  "/clients",
  // verifyToken,
  inputValidation,
  clientController.createClient
);
router.get("/clients/:id", clientController.findClient);
router.get("/clients/", clientController.searchClients);
router.get("/clients/:id", clientController.findClients);
router.put("/clients/:id", inputValidation, clientController.updateClient);
router.delete("/clients/:id", clientController.deleteClient);

module.exports = router;
