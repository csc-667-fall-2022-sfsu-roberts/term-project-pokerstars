const express = require("express");
const router = express.Router();
const Games = require("../../db/games");

router.get("/", (request, response) => {
  const { username, userID } = request.session;

  Games.all(userID)
    .then((games) =>
      response.render("authenticated/lobby.pug", {
        username,
        userID,
        games
      })
    )
    .catch((error) => {
      console.log(error);
      response.status(500).send();
    });
});

module.exports = router;
