"use strict";

const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { jwtRefreshExpiration } = require(path.resolve("./config/jwt.config"));
const { User } = require(path.resolve("./models"));

exports.createRefreshToken = async (username) => {
  const expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + jwtRefreshExpiration);

  const _token = uuidv4();

  await User.update(
    {
      refresh_token: _token,
      expire_token: expiredAt.getTime(),
    },
    { where: { username: username } }
  );

  return _token;
};

exports.verifyExpirationRefreshToken = (expiredAt) => {
  console.log(expiredAt);
  return expiredAt.getTime() < new Date().getTime();
};
