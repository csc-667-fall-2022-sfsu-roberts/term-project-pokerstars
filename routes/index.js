var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index.pug", { title: "Poker Stars" });
});

module.exports = router;
const pgtools = require("pgtools");
const config = {
  user: "pokestars_user",
  host: "dpg-cd4bjipgp3jqpbo8m10g-a",
  password: "mqlcmKyZXDE4R41MA322YIfdqZLKlf7H",
  port: 5432,
};

pgtools.createdb(config, "pokerstars", function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});
