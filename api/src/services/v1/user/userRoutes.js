const express = require("express");
const authController = require("./authController");
const userController = require("./userController");
const { verifyToken } = require("../../../helpers/verifyToken");
const { inputValidation } = require("./userValidator");

const router = express.Router();

// AUTH ROUTES
router.post(
  "/users/register",
  // verifyToken,
  inputValidation,
  authController.register
);
router.post("/users/login", authController.login);
// router.post("/users/login", limiter, authController.login);
router.post("/users/otp", authController.otp);
router.get("/users/token", authController.refreshAccessToken);
router.post("/users/logout", authController.logout);

// C(RUD) ROUTES
router.get("/users/", verifyToken, userController.getUsers);
router.get("/users/:id", verifyToken, userController.getUser);
router.put("/users", verifyToken, inputValidation, userController.update);
router.delete("/users", verifyToken, userController.destroy);

module.exports = router;
