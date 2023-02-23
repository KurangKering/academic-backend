"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const apiResponse = require(path.resolve("./utils/api-response.util"));
const { User } = require(path.resolve("./models"));
const { secret, jwtExpiration } = require(path.resolve("./config/jwt.config"));
const { createRefreshToken, verifyExpirationRefreshToken } = require(path.resolve("./utils/jwt.utils"));


exports.keepAlive = async(req, res) => {
  return res.status(200).send(apiResponse(true, ""));

};

exports.login = async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });

  if (!user) {
    return res.status(200).send(apiResponse(false, "User not found"));
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword) {
    return res.status(200).send(apiResponse(false, "Invalid password"));
  }

  const refreshToken = await createRefreshToken(user.username);

  let token = jwt.sign({ username: user.username }, secret, {
    expiresIn: jwtExpiration,
  });

  return res.status(200).send(
    apiResponse(true, "Login Success", {
      username: user.username,
      role: user.role,
      accessToken: token,
      refreshToken: refreshToken,
    })
  );
};

exports.refreshToken = async (req, res) => {
  if (!req.body["refresh-token"]) {
    return res.status(200).send(apiResponse(false, "No refresh token provided"));
  }

  const user = await User.findOne({
    where: { refresh_token: req.body["refresh-token"] },
  });

  if (!user) {
    return res
      .status(200)
      .send(apiResponse(false, "Refresh token not in database"));
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
    apiResponse(true, "Token refreshed", {
      accessToken: token,
      refreshToken: refreshToken,
    })
  );
};

exports.generatePassword = async (req, res) => {
  return res.send(await bcrypt.hash(req.body.password, 8));
};
