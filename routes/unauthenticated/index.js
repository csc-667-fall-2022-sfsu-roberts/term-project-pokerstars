var express = require("express");
var router = express.Router();
const pgtools = require("pgtools");

/**
const config = {
  user: "pokestars_user",
  host: "dpg-cd4bjipgp3jqpbo8m10g-a",
  password: "mqlcmKyZXDE4R41MA322YIfdqZLKlf7H",
  port: 5432,
};

pgtools.createdb(config, "pokerstars-db", function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});
*/
router.get("/", (request, response) => {
  response.render("unauthenticated/index.pug", {});
});

router.get("/signup", (request, response) => {
  response.render("unauthenticated/signup.pug", {});
});

router.get("/login", (request, response) => {
  response.render("unauthenticated/login.pug", {});
});

module.exports = router;
