const routes = require("express").Router();
// ROUTES
const userRouter = require("../services/v1/user/userRoutes");
const clientRouter = require("../services/v1/client/clientRoutes");
const cityRouter = require("../services/v1/member/routes/cityRoutes");
const memberRouter = require("../services/v1/member/routes/memberRoutes");
const subCityRouter = require("../services/v1/member/routes/subCityRoutes");
const memberTypeRouter = require("../services/v1/member/routes/memberTypeRoutes");

routes.use(
  "/v1/",
  userRouter,
  clientRouter,
  cityRouter,
  memberRouter,
  subCityRouter,
  memberTypeRouter
);

module.exports = routes;
