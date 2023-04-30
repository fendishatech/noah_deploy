const express = require("express");
const memberTypeController = require("../controllers/memberTypeController");
const { verifyToken } = require("../../../../helpers/authTokens");
const { inputValidation } = require("../validators/memberTypeValidator");

const router = express.Router();

// MEMBERTYPE ROUTES
router.post(
  "/member_types",
  // verifyToken,
  inputValidation,
  memberTypeController.createMemberType
);
router.get("/member_types/", memberTypeController.findMemberTypes);
router.get("/member_types/search", memberTypeController.searchMemberTypes);
router.get("/member_types/:id", memberTypeController.findMemberType);
router.put(
  "/member_types/:id",
  inputValidation,
  memberTypeController.updateMemberType
);
router.delete("/member_types/:id", memberTypeController.deleteMemberType);

module.exports = router;
