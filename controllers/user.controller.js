"use strict";

const path = require("path");
const { Mahasiswa, Dosen } = require(path.resolve("./models"));
const apiResponse = require(path.resolve("./utils/api-response.util"));

exports.account = async (req, res) => {
  const user = req.app.locals.user;
  let account = {};

  switch (user.role) {
    case "mahasiswa":
      account = await Mahasiswa.findOne({
        nest: true,
        where: { id_mhs: user.username },
        include: [
          { association: "jurusan" },
          { association: "pembimbing", include: [{ association: "jurusan" }], required: false },
        ],
      });
      break;
    case "dosen":
      account = await Dosen.findOne({
        nest: true,
        where: { id_dsn: user.username },
        include: [{ association: "jurusan" }],
      });
      break;
    default:
      break;
  }

  return res.send(apiResponse(true, "Account retrieved", account));
};
