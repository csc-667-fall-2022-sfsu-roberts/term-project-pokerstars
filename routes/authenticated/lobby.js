var express = require("express");
var router = express.Router();

router.get("/", (request, response) => {
  response.render("authenticated/lobby.pug", {});
});

module.exports = router;
