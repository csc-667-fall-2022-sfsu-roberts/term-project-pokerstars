const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  const { sessionID } = request;
  const { username, userID } = request.session;

  response.render("authenticated/lobby.pug", { username, userID });
});

module.exports = router;
