const User = require("../models/userModel");
const { authenticator } = require("otplib");
const { sendOTP } = require("../../../helpers/otp");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../../helpers/authTokens");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const {
    first_name,
    father_name,
    last_name,
    email,
    phone_no,
    password,
    avatar,
    user_role,
  } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      first_name: first_name,
      father_name: father_name,
      last_name: last_name,
      email: email,
      phone_no: phone_no,
      password: hashedPassword,
      avatar: avatar,
      user_role: user_role,
    });

    return res.status(200).json({
      success: true,
      payload: user,
      message: "User was created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.errors[0].message,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        phone_no: req.body.phone_no,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User could not be found.",
      });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "phone number or password not correct",
      });
    }

    // generate secret and otp
    const secret = authenticator.generateSecret();
    const otp_code = authenticator.generate(secret);

    //  store otp secret
    res.cookie("otp_secret", secret, {
      httpOnly: true,
      // maxAge: 2 * 60 * 1000,
      // secure : true
    });

    // send otp to user
    if (true) {
      // if (sendOTP("0913974307", otp_code)) {
      // if (sendOTP(user.phone_no, otp_code)) {
      return res.status(200).json({
        success: true,
        payload: {
          phone_no: user.phone_no,
        },
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "There was an error sending short code!",
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const otp = async (req, res) => {
  const otp_code = req.body.otp_code;
  const secret = req.cookies.otp_secret;

  console.log({ secret });
  if (otp_code && secret) {
    const isValid = authenticator.verify({ token: otp_code, secret: secret });

    if (isValid) {
      return res.json({ verified: true, success: "Is that you baby" });
    } else {
      return res.json({ verified: false });
    }
  } else {
    return res.json({
      success: false,
      message: "There was a problem verifying the OTP Code",
    });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    // GET REFRESH TOKEN
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token in header" });
    // GET USER WITH THAT REFRESH TOKEN IN THE DATABASE
    const user = await User.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    // IF THERE IS NO USER WITH THAT REFRESH TOKEN
    if (!user[0]) {
      return res.status(403).json("Unauthorized User");
    }
    const userPayload = {
      id: user[0].id,
      first_name: user[0].first_name,
      father_name: user[0].father_name,
      last_name: user[0].last_name,
      email: user[0].email,
      phone_no: user[0].phone_no,
      user_role: user[0].user_role,
    };
    // VERIFY
    try {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) return res.sendStatus(403);

          const accessToken = generateAccessToken(userPayload);

          res.cookie("accessToken", accessToken, {
            httpOnly: true,
            // secure: true,
            // maxAge: 20 * 1000,
          });

          res.status(200).send();
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(204).json({
        message: "Unauthorized",
      });
    const user = await User.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user[0]) {
      return res.status(204).json({
        error: "there is no user",
      });
    }

    const userId = user[0].id;
    await User.update(
      {
        refresh_token: null,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    res.clearCookie("refreshToken");
    return res.status(200).json({
      message: "User logged out",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  otp,
  refreshAccessToken,
  logout,
};

// user payload, generate tokens, store, set cookies
// const userPayload = {
//   id: user.id,
//   first_name: user.first_name,
//   father_name: user.father_name,
//   last_name: user.last_name,
//   email: user.email,
//   phone_no: user.phone_no,
//   user_role: user.user_role,
// };

// const accessToken = generateAccessToken(userPayload);

// const refreshToken = generateRefreshToken(userPayload);

// await User.update(
//   {
//     refresh_token: refreshToken,
//   },
//   {
//     where: { id: user.id },
//   }
// );

// res.cookie("accessToken", accessToken, {
//   httpOnly: true,
// });

// res.cookie("refreshToken", refreshToken, {
//   httpOnly: true,
// });
