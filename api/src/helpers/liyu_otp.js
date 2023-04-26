const crypto = require("crypto");

function generateSecret() {
  return crypto.randomBytes(32).toString("base64");
}

function generateTOTP(secret) {
  const time = Math.floor(Date.now() / 30000); // Get the current time in 30-second intervals
  const counter = Buffer.alloc(8);
  counter.writeBigInt64BE(BigInt(time)); // Convert the time to an 8-byte buffer in big-endian byte order

  const hash = crypto.createHmac("sha256", secret).update(counter).digest(); // Generate the HMAC-SHA256 hash
  const offset = hash[hash.length - 1] & 0xf; // Get the offset into the hash
  const code = (hash.readUInt32BE(offset) & 0x7fffffff) % 1000000; // Extract a 6-digit decimal code from the hash
  return code.toString().padStart(6, "0"); // Pad the code with leading zeros if necessary
}

function verifyTOTP(secret, code) {
  const time = Math.floor(Date.now() / 30000); // Get the current time in 30-second intervals
  const counter = Buffer.alloc(8);
  counter.writeBigInt64BE(BigInt(time)); // Convert the time to an 8-byte buffer in big-endian byte order

  const hash = crypto.createHmac("sha256", secret).update(counter).digest(); // Generate the HMAC-SHA256 hash
  const offset = hash[hash.length - 1] & 0xf; // Get the offset into the hash
  const expectedCode = (hash.readUInt32BE(offset) & 0x7fffffff) % 1000000; // Extract a 6-digit decimal code from the hash

  return code === expectedCode.toString(); // Compare the user's code to the expected code (as a string)
}

module.exports = {
  generateSecret,
  generateTOTP,
  verifyTOTP,
};
