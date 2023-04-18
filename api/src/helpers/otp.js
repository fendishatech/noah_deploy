const speakeasy = require("speakeasy");

function generateOTP() {
  const secret = speakeasy.generateSecret({ length: 20 });
  const token = speakeasy.totp({
    secret: secret.base32,
    encoding: "base32",
    step: 60, // OTP code changes every 60 seconds
    digits: 6, // OTP code is 6 digits long
  });
  const expires = Date.now() + 60 * 1000; // OTP code expires in 60 seconds
  return { secret, token, expires };
}

function verifyOTP(secret, token) {
  const verified = speakeasy.totp.verify({
    secret: secret.base32,
    encoding: "base32",
    token,
    window: 1, // OTP code is valid for 1 step (60 seconds) before and after the current time
  });
  return verified;
}
