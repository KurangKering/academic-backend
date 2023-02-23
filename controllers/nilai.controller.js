"use strict";

const path = require("path");
const { Nilai, Semester } = require(path.resolve("./models"));
const apiResponse = require(path.resolve("./utils/api-response.util"));
const { jsPDF } = require("jspdf");
const puppeteer = require("puppeteer");
const { clearConfig } = require("dompurify");

// menampilkan khs mahasiswa
// params : id_mhs, id_smt
exports.lihatKhs = async (req, res) => {
  const user = req.app.locals.user;
  if (user.role == "mahasiswa" && user.username != req.params.idMhs) {
    return res.send(apiResponse(false, "Cannot access this page"));
  }
  const idMhs = user.role == "mahasiswa" ? user.username : req.params.idMhs;
  const khs = await Nilai.getKhs(idMhs, req.params.idSmt);
  return res.send(apiResponse(true, "", khs));
};

// menampilkan krs mahasiswa
// params: id_mhs, id_smt
exports.lihatKrs = async (req, res) => {
  const user = req.app.locals.user;
  if (user.role == "mahasiswa" && user.username != req.params.idMhs) {
    return res.send(apiResponse(false, "Cannot access this page"));
  }
  const idMhs = user.role == "mahasiswa" ? user.username : req.params.idMhs;
  const krs = await Nilai.getKrs(idMhs, req.params.idSmt);
  return res.send(apiResponse(true, "", krs));
};

// menampilkan stream pdf khs
// params: id_mhs, id_smt
exports.cetakKhs = async (req, res) => {
  const idMhs = req.params.idMhs;
  const idSmt = req.params.idSmt;
  const content = {
    nilai: await Nilai.getKhs(idMhs, idSmt),
    tahunAjaran: idSmt,
  };

  let html = "";
  const rendered = res.render("khs", content, (err, _html) => {
    html = _html;
  });
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf({ format: "A4", printBackground: true, landscape: true });

  await browser.close();
  res.contentType("application/pdf");
  res.send(pdf);
};

// menampilkan stream pdf krs
// params: id_mhs, id_smt
exports.cetakKrs = async (req, res) => {
  const idMhs = req.params.idMhs;
  const idSmt = req.params.idSmt;
  const content = {
    nilai: await Nilai.getKrs(idMhs, idSmt),
    tahunAjaran: idSmt,
  };

  let html = "";
  const rendered = res.render("krs", content, (err, _html) => {
    html = _html;
  });
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf({ format: "A4", printBackground: true, landscape: true });

  await browser.close();
  res.contentType("application/pdf");
  res.send(pdf);
};
