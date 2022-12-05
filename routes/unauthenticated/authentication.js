const express = require("express");
const Users = require("../../db/users");
const router = express.Router();

const handleLogin =
  (request, response) =>
  ({ id, username }) => {
    request.session.authenticated = true;
    request.session.userID = id;
    request.session.username = username;

    response.redirect("/lobby");
  };

const handleLoginError = (response, redirectUri) => (error) => {
  console.log({ error });
  response.redirect(redirectUri);
};

router.get("/", (request, response) => {
  response.render("unauthenticated/index.pug", { title: "Poker Stars" });
});

router.get("/login", (request, response) => {
  response.render("unauthenticated/login.pug", { title: "Poker Stars" });
});

router.post("/login", (request, response) => {
  const { username, password } = request.body;

  Users.login({ username, password })
    .then(handleLogin(request, response))
    .catch(handleLoginError(response, "/login"));
});

router.get("/signup", (request, response) => {
  response.render("unauthenticated/signup.pug", {});
});

router.post("/signup", (request, response) => {
  const { username, password } = request.body;

  Users.register({ username, password })
    .then(handleLogin(request, response))
    .catch(handleLoginError(response, "/signup"));
});

router.get("/logout", (request, response) => {
  request.session.authenticated = false;

  response.redirect("/");
});

module.exports = router;
