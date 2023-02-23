const path = require("path");
const kuliahMhsController = require(path.resolve("./controllers/kuliahmhs.controller"));
const { isAllowed } = require(path.resolve("./middlewares/auth.middleware"));

module.exports = (router) => {
  router.get("/kuliah-mhs/mahasiswa", [isAllowed("mahasiswa")], kuliahMhsController.mahasiswa);
  router.get("/kuliah-mhs/daftar-kuliah-mhs/:idMhs", [isAllowed("mahasiswa")], kuliahMhsController.daftarKuliahMhs);
  router.get("/kuliah-mhs/kuliah-mhs/:idMhs/:idSmt", [isAllowed("mahasiswa")], kuliahMhsController.kuliahMhs);
  return router;
};
