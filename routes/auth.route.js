const authController = require("../controllers/auth.controller");

module.exports = (router) => {
  router.post("/login", authController.login);
  router.post("/generate-password", authController.generatePassword);
  router.post("/refresh-token", authController.refreshToken);

  return router;
};
