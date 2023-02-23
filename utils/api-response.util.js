"use strict";

module.exports = (success, message, data = null) => {
  return {
    success,
    data,
    message,
  };
};