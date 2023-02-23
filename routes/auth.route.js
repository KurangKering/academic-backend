const path = require("path");
const authController = require(path.resolve("./controllers/auth.controller"));
const { isAllowed } = require(path.resolve("./middlewares/auth.middleware"));

module.exports = (router) => {
  router.get("/keep-alive",  [isAllowed("mahasiswa")], authController.keepAlive);
  router.post("/login", authController.login);
  router.post("/generate-password", authController.generatePassword);
  router.post("/refresh-token", authController.refreshToken);

  return router;
};
