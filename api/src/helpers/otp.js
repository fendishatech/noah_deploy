const axios = require("axios");

async function sendOTP(phone_no, OTP_CODE) {
  const message = {
    token: process.env.SMS_API_KEY,
    to: phone_no, // String
    message: OTP_CODE,
    template_id: "otp",
  };

  const response = await axios.post(`${process.env.SMS_SERVER}/send`, message);
  console.log(response.data);
  return response ? true : false;
}

module.exports = {
  sendOTP,
};
