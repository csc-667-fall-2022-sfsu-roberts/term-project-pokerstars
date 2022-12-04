const express = require("express");
const router = express.Router();
const Games = require("../../db/games");

router.post("/create", (request, response) => {
  const { userId } = request.session;
  const { title = "" } = request.body;

  Games.create(userId, title)
    .then(({ game_id }) => {
      response.redirect(`/games/${game_id}`);

      request.app.io.emit("game:created", {
        game_id,
        title
      });
    })
    .catch((error) => {
      console.log(error);
    });

  // const { id } = request.params;
  // const { message } = request.body;
  // const { username } = request.session;
  // const timestamp = Date.now();

  // request.app.io.emit(`chat:${id}`, {
  //   sender: username,
  //   message,
  //   timestamp
  // });

  // response.sendStatus(200);
});

module.exports = router;
