const express = require("express");
const router = express.Router();
const Games = require("../../db/games");
const Gamerooms = require("../../db/gamerooms");
const GameroomChat = require("../../db/gameroom-chats");

router.post("/create/gameroom", (request, response) => {
  const { userID } = request.session;
  const { title } = request.body;

  Gamerooms.create(userID, title)
    .then(({ gameroom_id }) => {
      response.redirect(`/gameroom/${gameroom_id}/${title}`);

      request.app.io.emit("gameroom:created", {
        gameroom_id,
        title
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).send();
    });
});

router.post("/create", (request, response) => {
  const { userID } = request.session;
  const { title } = request.body;

  Games.create(userID, title)
    .then(({ game_id }) => {
      response.redirect(`/game/${game_id}/${title}`);

      request.app.io.emit("game:created", {
        game_id,
        title
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).send();
    });
});

router.get("/:id/:title", (request, response) => {
  const gameroom_id = request.params.id;
  const title = request.params.title;
  const { username } = request.session;

  GameroomChat.all(gameroom_id).then((chats) => {
    response.render("authenticated/gameroom.hbs", {
      username: username,
      gameroom_title: title,
      gameroom_id: gameroom_id,
      comments: chats,
      game: "/public/js/gameroom.js",
      cards: "/public/js/cards.js",
      style: "../../public/stylesheets/gameroom.css",
      cardStyle: "../../public/stylesheets/cards.css"
    });
  });
});

router.get("/:id", (request, response) => {
  const { id } = body.params;

  response.redirect(`/game/${id}`);
});

// router.get("/:id/:title", (request, response) => {
//   const id = request.params.id;
//   const title = request.params.title;

//   response.redirect(`/game/${id}/${title}`);
// });

router.post("/:id/join", (request, response) => {
  const { id: game_id } = request.params;
  const { userID: user_id } = request.session;

  Games.join(game_id, user_id)
    .then(() => response.redirect(`/game/${game_id}`))
    .catch((error) => {
      console.log(error);
      response.status(500).send();
    });
});

router.post("/:id/:title/join", (request, response) => {
  const gameroom_id = request.params.id;
  const title = request.params.title;
  const { userID: user_id } = request.session;

  Gamerooms.join(gameroom_id, user_id)
    .then(() => response.redirect(`/gameroom/${gameroom_id}/${title}`))
    .catch((error) => {
      console.log(error);
      response.status(500).send();
    });
});

router.get("/:id/:message", (request, resposne) => {
  const { id, message } = request.params;

  response.render("authenticated/gameroom.hbs", {
    game_id: id,
    message: message,
    game: "/public/js/gameroom.js",
    cards: "/public/js/cards.js",
    style: "../../public/stylesheets/gameroom.css",
    cardStyle: "../../public/stylesheets/cards.css"
  });
});

module.exports = router;
