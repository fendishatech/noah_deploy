const User = require("../models/userModel");
const bcrypt = require("bcrypt");

attributes = [
  "id",
  "first_name",
  "father_name",
  "last_name",
  "email",
  "avatar",
];

const getUsers = async (req, res) => {
  if (req.user && req.user.user_role == "admin") {
    try {
      const users = await User.findAll({
        attributes: attributes,
      });
      res.status(200).json({
        success: true,
        payload: users,
      });
    } catch (error) {
      res.status(500);
    }
  } else {
    return res.status(403).json({
      message: "You Are not Authorized !",
    });
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const users = await User.findByPk(id, {
      attributes: attributes,
    });
    res.status(200).json({
      success: true,
      payload: users,
    });
  } catch (error) {
    res.status(500);
  }
};

const update = async (req, res) => {
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
};

const destroy = async (req, res) => {
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
};

module.exports = {
  getUsers,
  getUser,
  update,
  destroy,
};
