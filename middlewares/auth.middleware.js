"use strict";

const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;
const path = require("path");
const { secret } = require(path.resolve("./config/jwt.config"));
const User = require(path.resolve("./models")).User;
const apiResponse = require(path.resolve("./utils/api-response.util"));

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
      return res.status(token.code).send(apiResponse(false, token.message));
    }

    const user = await User.findOne({
      where: { username: token.message.username },
    });

    if (!user) {
      return res.status(403).send(apiResponse(false, "User not found"));
    }

    if (roles && !roles.includes(user.role)) {
      return res.status(403).send(apiResponse(false, "Permission denied"));
    }
    req.app.locals.user = user;
    next();
  };
};
