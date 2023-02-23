const path = require("path");
const userController = require(path.resolve("./controllers/user.controller"));
const { isAllowed } = require(path.resolve("./middlewares/auth.middleware"));

module.exports = (router) => {
  router.get("/user/profile", [isAllowed("dosen", "mahasiswa")], userController.account);
  return router;
};
