/* eslint-disable quotes */

const express = require("express");
const router = express.Router();
const controllers = require("./controller/controller.js");

router.post("/login", controllers.postWelcome );

router.get("/", (req, res) => {
  res.send("hello wor");
});

router.get("/test", controllers.getAssociation);

module.exports = router ;

