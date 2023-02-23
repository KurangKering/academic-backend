"use strict";

const path = require("path");
const { KuliahMhs, Semester } = require(path.resolve("./models"));
const apiResponse = require(path.resolve("./utils/api-response.util"));

exports.mahasiswa = async (req, res) => {
  const smtAktif = await Semester.getAktif();
  const user = req.app.locals.user;
  const kmhs = await KuliahMhs.getKmhs(smtAktif.id_smt, user.username);
  return res.send(apiResponse(true, "", kmhs));
};

// menampilkan daftar kuliah mahasiswa: id_smt, semester, status kmhs, ips, ipk
exports.daftarKuliahMhs = async (req, res) => {
  const user = req.app.locals.user;
  if (user.role == "mahasiswa" && user.username != req.params.idMhs) {
    return res.send(apiResponse(false, "Cannot access this page"));
  }
  const idMhs = (user.role == "mahasiswa") ? user.username : req.params.idMhs;
  const kmhs = await KuliahMhs.getAllKmhs(idMhs);
  return res.send(apiResponse(true, "", kmhs));
};

// menampilkan satu kuliah mahasiswa: id_smt, semester, status kmhs, ips, ipk
exports.kuliahMhs = async (req, res) => {
  const user = req.app.locals.user;
  if (user.role == "mahasiswa" && user.username != req.params.idMhs) {
    return res.send(apiResponse(false, "Cannot access this page"));
  }
  const idMhs = (user.role == "mahasiswa") ? user.username : req.params.idMhs;

  const kmhs = await KuliahMhs.getKmhs(idMhs, req.params.idSmt);
  return res.send(apiResponse(true, "", kmhs));
};

