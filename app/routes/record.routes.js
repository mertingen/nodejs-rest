module.exports = app => {
  const records = require("../controllers/record.controller.js");

  var router = require("express").Router();

  // to get all Records
  router.post("/", records.findAll);

  // route suffix is defined
  app.use("/api/records", router);

};
