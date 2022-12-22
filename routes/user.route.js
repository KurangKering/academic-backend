const userController = require("../controllers/user.controller");
const { isAllowed } = require("../middlewares/auth.middleware");

module.exports = (router) => {
  router.get("/user/account", [isAllowed("dosen", "mahasiswa")], userController.account);
  return router;
};
