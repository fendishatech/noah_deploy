require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const helmet = require("helmet");
const cors = require("cors");
// const csrf = require("csurf");

const routes = require("./src/routes/");
// DEV
const migrate_tables = require("./src/helpers/db_sync_models");

// SERVER APPLICATION
const app = express();

// MIDDLEWAREs
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origins: ["http://localhost:5173/"],
    credentials: true,
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
