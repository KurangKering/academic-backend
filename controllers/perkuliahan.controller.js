"use strict";

const { Mahasiswa, Dosen, KuliahMhs } = require("../models");
const response = require("../utils/response.util");

exports.account = async (req, res) => {
  const user = req.app.locals.user;
  let account = {};

  switch (user.role) {
    case "mahasiswa":
      account = await Mahasiswa.findOne({ where: { id_mhs: user.username } });
      break;
    case "dosen":
      account = await Dosen.findOne({ where: { id_dsn: user.username } });
      break;
    default:
      break;
  }

  return res.send(response(true, "Account retrieved", account));
};
