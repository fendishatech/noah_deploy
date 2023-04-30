const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");

const userSpec = YAML.load("./src/documentation/user.spec.yaml");
const clientSpec = YAML.load("./src/documentation/client.spec.yaml");

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "NOAH SAC COOP API DOCUMENTATION",
    version: "1.0.0",
  },
  paths: {
    ...clientSpec.paths,
    ...userSpec.paths,
    // ...productApi.paths,
  },
};

const swaggerMiddleware = swaggerUi.setup(swaggerDocument);

module.exports = swaggerMiddleware;
