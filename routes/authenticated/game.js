const express = require("express");
const router = express.Router();

router.get("/:id", (request, response) => {
  const { id } = request.params;

  response.render("authenticated/gameroom.hbs", {
    title: "Game Room",
    game_id: id,
    game: "/public/js/gameroom.js",
    cards: "/public/js/cards.js",
    style: "../../public/stylesheets/gameroom.css",
    cardStyle: "../../public/stylesheets/cards.css"
  });
});

router.get("/:id/:message", (request, response) => {
  const { id, message } = request.params;

  response.render("authenticated/gameroom.hbs", {
    title: "Game Room",
    game_id: id,
    message: message,
    game: "/public/js/gameroom.js",
    cards: "/public/js/cards.js",
    style: "../../public/stylesheets/gameroom.css",
    cardStyle: "../../public/stylesheets/cards.css"
  });
});

module.exports = router;
