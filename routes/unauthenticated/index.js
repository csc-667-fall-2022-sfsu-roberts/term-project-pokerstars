var express = require("express");
var router = express.Router();

router.get("/", (request, response) => {
  response.render("unauthenticated/index.pug", {});
});

module.exports = router;
