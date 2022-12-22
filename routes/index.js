module.exports = (app) => {
  const express = require("express");
  const router = express.Router();

  app.use(require("./auth.route")(router));
  app.use(require("./mahasiswa.route")(router));
  app.use(require("./user.route")(router));

  app.get("/", function (req, res, next) {
    return res.send("Academic API");
  });

  return router;
};
