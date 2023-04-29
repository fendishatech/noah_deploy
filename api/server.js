require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
// const csrf = require("csurf");

const routes = require("./src/routes/");
// DEV
const migrate_tables = require("./src/helpers/db_sync_models");

// SERVER APPLICATION
const app = express();

// MIDDLEWAREs
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
// app.use(csrf({ cookie: true }));

// API ROUTES
app.use("/api/", routes);
app.use("/cookies", (req, res) => {
  res.json({
    cookies: req.cookies,
    secret: req.cookies.otp_secret,
  });
});
// DOC ROUTES
// app.use("/api-docs", swaggerUi.serve, swaggerMiddleware);

/* -------------------------------------------------------------------------- */
/* ----------------------------------- DEV ---------------------------------- */
/* -------------------------------------------------------------------------- */

// MIGRATIONS
// migrate_tables();

/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

// SERVER
app.listen(process.env.PORT, () => {
  console.log(
    `App is Running Fine on port http://localhost:${process.env.PORT}`
  );
});

module.exports = app;
