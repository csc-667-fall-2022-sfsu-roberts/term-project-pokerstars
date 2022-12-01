const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  const { sessionID } = request;
  const { username } = request.session;

  response.render("authenticated/lobby.pug", { username, sessionID });
});

module.exports = router;
