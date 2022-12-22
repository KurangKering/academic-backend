"use strict";

const { jwtRefreshExpiration } = require("../config/auth.config");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../models");

exports.createRefreshToken = async (username) => {
  const expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + jwtRefreshExpiration);

  const _token = uuidv4();

  const refreshToken = await User.update(
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
