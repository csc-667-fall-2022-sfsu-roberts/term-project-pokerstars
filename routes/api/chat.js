const express = require("express");
const router = express.Router();
const GameroomChat = require("../../db/gameroom-chats");

router.post("/:id", (request, response) => {
  const { id } = request.params;
  const { message } = request.body;
  const { username } = request.session;
  const timestamp = Date.now();

  request.app.io.emit(`chat:${id}`, {
    sender: username,
    message,
    timestamp
  });

  response.sendStatus(200);
});

router.post("/gameroom/:id", (request, response) => {
  const { id: gameroom_id } = request.params;
  const { message } = request.body;
  const { userID: user_id } = request.session;
  const { username } = request.session;
  const timestamp = Date.now();

  GameroomChat.create(gameroom_id, username, message, timestamp)
    .then(() => {
      console.log("Comment Entered.");
    })
    .catch((error) => {
      console.log(error);
      response.status(500).send();
    });

  request.app.io.emit(`chat/gameroom/:${gameroom_id}`, {
    sender: username,
    message,
    timestamp
  });

  response.sendStatus(200);
});

module.exports = router;
