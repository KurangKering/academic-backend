const bcrypt = require("bcryptjs");
const response = require("../utils/response.util");
const { User } = require("../models");
const { secret, jwtExpiration } = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const {
  createRefreshToken,
  verifyExpirationRefreshToken,
} = require("../utils/jwt.utils");

exports.login = async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });

  if (!user) {
    return res.status(200).send(response(false, "User not found"));
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword) {
    return res.status(200).send(response(false, "Invalid password"));
  }

  const refreshToken = await createRefreshToken(user.username);

  let token = jwt.sign({ username: user.username }, secret, {
    expiresIn: jwtExpiration,
  });

  return res.status(200).send(
    response(true, "Login Success", {
      username: user.username,
      role: user.role,
      accessToken: token,
      refreshToken: refreshToken,
    })
  );
};

exports.refreshToken = async (req, res) => {
  if (!req.body["refresh-token"]) {
    return res.status(200).send(response(false, "No refresh token provided"));
  }

  const user = await User.findOne({
    where: { refresh_token: req.body["refresh-token"] },
  });

  if (!user) {
    return res
      .status(200)
      .send(response(false, "Refresh token not in database"));
  }

  if (verifyExpirationRefreshToken(user.expire_token)) {
    User.update(
      { refresh_token: null, expire_token: null },
      { username: user.username }
    );
    return res.status(200).json({
      message: "Refresh token was expired. Please make a new signin request",
    });
  }

  const token = jwt.sign({ username: user.username }, secret, {
    expiresIn: jwtExpiration,
  });
  const refreshToken = await createRefreshToken(user.username);

  return res.status(200).send(
    response(true, "Token refreshed", {
      accessToken: token,
      refreshToken: refreshToken,
    })
  );
};

exports.generatePassword = async (req, res) => {
  return res.send(await bcrypt.hash(req.body.password, 8));
};
