const path = require("path");
const semesterController = require(path.resolve("./controllers/semester.controller"));
const { isAllowed } = require(path.resolve("./middlewares/auth.middleware"));

module.exports = (router) => {
  router.get("/semester/aktif", [isAllowed("dosen", "mahasiswa")], semesterController.aktif);
  return router;
};
