var express = require("express");
const { request } = require("../../app");
var router = express.Router();

router.get("/", (request, response) => {
  response.render("unauthenticated/index.pug", {});
});

router.get("/signup", (_request, response) => {
  response.render("unauthenticated/signup.pug", {});
});

router.get("/login", (_request, response) => {
  response.render("unauthenticated/login.pug", {});
});

router.post("/login", (request, response) => {
  const { username, password } = request.body;

  request.session.authenticated = true;
  request.session.username = username;

  response.redirect("/lobby");
});

module.exports = router;
