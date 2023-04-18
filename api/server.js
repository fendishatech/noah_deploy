require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
// const csrf = require("csurf");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const routes = require("./src/routes/");
// DEV
const migrate_tables = require("./src/helpers/db_sync_models");

// SERVER APPLICATION
const app = express();

// MIDDLEWAREs
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(csrf({ cookie: true }));

// API ROUTES
app.use("/api/", routes);

// DOC ROUTES
// app.use("/api-docs", swaggerUi.serve, swaggerMiddleware);

// SERVER
app.listen(process.env.PORT, () => {
  console.log(
    `App is Running Fine on port http://localhost:${process.env.PORT}`
  );
});

/* -------------------------------------------------------------------------- */
/* ----------------------------------- DEV ---------------------------------- */
/* -------------------------------------------------------------------------- */

// MIGRATIONS
migrate_tables();
