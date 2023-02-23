const path = require("path");
const nilaiController = require(path.resolve("./controllers/nilai.controller"));
const { isAllowed } = require(path.resolve("./middlewares/auth.middleware"));

module.exports = (router) => {
  router.get("/nilai/lihat-khs/:idMhs/:idSmt", [isAllowed("mahasiswa", "dosen")], nilaiController.lihatKhs);
  router.get("/nilai/lihat-krs/:idMhs/:idSmt", [isAllowed("mahasiswa", "dosen")], nilaiController.lihatKrs);
  router.get("/nilai/cetak-khs/:idMhs/:idSmt", [isAllowed("mahasiswa", "dosen")], nilaiController.cetakKhs);
  router.get("/nilai/cetak-krs/:idMhs/:idSmt", [isAllowed("mahasiswa", "dosen")], nilaiController.cetakKrs);
  return router;
};
