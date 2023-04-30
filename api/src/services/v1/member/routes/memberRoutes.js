const express = require("express");
const memberController = require("../controllers/memberController");
const { verifyToken } = require("../../../../helpers/authTokens");
const { inputValidation } = require("../validators/memberValidator");

const router = express.Router();

// MEMBER ROUTES
router.post(
  "/members",
  // verifyToken,
  inputValidation,
  memberController.createMember
);
router.get("/members/", memberController.findMembers);
router.get("/members/search", memberController.searchMembers);
router.get("/members/:id", memberController.findMember);
router.put("/members/:id", inputValidation, memberController.updateMember);
router.delete("/members/:id", memberController.deleteMember);

module.exports = router;
