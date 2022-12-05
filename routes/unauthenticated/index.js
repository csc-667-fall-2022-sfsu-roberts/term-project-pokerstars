const express = require("express");
const router = express.Router();

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
