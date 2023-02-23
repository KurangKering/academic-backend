"use strict";

const path = require("path");
const { Semester } = require(path.resolve("./models"));
const apiResponse = require(path.resolve("./utils/api-response.util"));

exports.aktif = async (req, res) => {
  const semester = await Semester.geAktif();

  res.send(apiResponse(true, "", semester));
};
