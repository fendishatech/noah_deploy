const User = require("../models/userModel");
const { authenticator } = require("otplib");
const { sendOTP } = require("../../../helpers/otp");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../../helpers/authTokens");
const bcrypt = require("bcrypt");

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
const OTP_SECRET_COOKIE_NAME = "otp_secret";
const OTP_ERROR_MESSAGE = "There was a problem verifying the OTP Code";
const USER_NOT_FOUND_MESSAGE = "User could not be found";
const SHORT_CODE_ERROR_MESSAGE = "There was an error sending short code!";
const UNAUTHORIZED_MESSAGE = "Unauthorized";
const NO_USER_MESSAGE = "There is no user";
const LOGOUT_MESSAGE = "User logged out";
// TEMPORARY
let OTP_VERIFICATION_SECRET = "";

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

    res.cookie(OTP_SECRET_COOKIE_NAME, secret, {
      httpOnly: true,
    });
    OTP_VERIFICATION_SECRET = secret;
    if (true) {
      // if (sendOTP(user.phone_no, otp_code)) {
      console.log(`Secret ${secret}, otp_code : ${otp_code}`);
      return res.status(200).json({
        success: true,
        payload: {
          phone_no: user.phone_no,
        },
      });
    } else {
      return res.status(200).json({
        success: false,
        message: SHORT_CODE_ERROR_MESSAGE,
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
  const phone_no = req.body.phone_no;
  const secret =
    req.cookies[OTP_SECRET_COOKIE_NAME] != undefined
      ? req.cookies[OTP_SECRET_COOKIE_NAME]
      : OTP_VERIFICATION_SECRET;

  console.log(`Secret ${secret}, otp_code : ${otp_code}`);

  try {
    const user = await User.findOne({
      where: {
        phone_no: phone_no,
      },
    });

    if (!user) {
      return res.json({
        success: false,
        message: USER_NOT_FOUND_MESSAGE,
      });
    }

    if (otp_code && secret) {
      const isValid = authenticator.verify({ token: otp_code, secret: secret });

      if (isValid) {
        const userPayload = {
          id: user.id,
          first_name: user.first_name,
          father_name: user.father_name,
          last_name: user.last_name,
          email: user.email,
          phone_no: user.phone_no,
          user_role: user.user_role,
        };

        const accessToken = generateAccessToken(userPayload);
        const refreshToken = generateRefreshToken(userPayload);

        await User.update(
          {
            refresh_token: refreshToken,
          },
          {
            where: { id: user.id },
          }
        );

        res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
          httpOnly: true,
        });

        res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
          httpOnly: true,
        });

        return res.json({ verified: true, success: true });
      } else {
        return res.json({ success: false, verified: false });
      }
    } else {
      return res.json({
        success: false,
        message: OTP_ERROR_MESSAGE,
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
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
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];

    if (!refreshToken) {
      return res.status(401).json({
        message: UNAUTHORIZED_MESSAGE,
      });
    }

    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: NO_USER_MESSAGE,
      });
    }

    await updateUser(user.id, { refresh_token: null });

    res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);

    return res.status(200).json({
      message: LOGOUT_MESSAGE,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (userId, data) => {
  await User.update(data, {
    where: {
      id: userId,
    },
  });
};

module.exports = {
  register,
  login,
  otp,
  refreshAccessToken,
  logout,
};
