const jwt = require("jsonwebtoken");

function generateAccessToken(userPayload) {
  return jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "60s",
  });
}

function generateRefreshToken(userPayload) {
  return jwt.sign(userPayload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
}

module.exports = { generateAccessToken, generateRefreshToken };
