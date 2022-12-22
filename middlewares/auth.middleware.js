"use strict";

const jwt = require("jsonwebtoken");
const { secret } = require("../config/auth.config");
const User = require("../models").User;
const response = require("../utils/response.util");
const { TokenExpiredError } = jwt;

const hasToken = (req) => {
  const token = req.headers["x-access-token"];
  let result = {};

  if (!token) {
    return {
      success: false,
      code: 403,
      message: "No token provided",
    };
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        result = {
          success: false,
          code: 401,
          message: "Unauthorized! Access Token was expired!",
        };
      } else {
        result = {
          success: false,
          code: 401,
          message: err.message,
        };
      }
    } else {
      result = {
        success: true,
        message: { username: decoded.username },
      };
    }
  });

  return result;
};

exports.isAllowed = (...roles) => {
  return async (req, res, next) => {
    const token = hasToken(req);

    if (!token.success) {
      return res.status(token.code).send(response(false, token.message));
    }

    const user = await User.findOne({
      where: { username: token.message.username },
    });

    if (!user) {
      return res.status(403).send(response(false, "User not found"));
    }

    if (roles && !roles.includes(user.role)) {
      return res.status(403).send(response(false, "Permission denied"));
    }
    req.app.locals.user = user;
    next();
  };
};
