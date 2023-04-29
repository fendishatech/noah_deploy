const routes = require("express").Router();
// ROUTES
const userRouter = require("../services/v1/user/userRoutes");
const clientRouter = require("../services/v1/client/clientRoutes");

routes.use("/v1/", userRouter, clientRouter);

module.exports = routes;
