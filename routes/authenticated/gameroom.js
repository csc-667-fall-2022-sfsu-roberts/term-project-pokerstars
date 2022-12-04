const express = require("express");
const router = express.Router();
const Games = require("../../db/games");

router.post("/create", (request, response) => {
  const { userID } = request.session;
  const { title } = request.body;

  Games.create(userID, title)
    .then(({ game_id }) => {
      response.redirect(`/game/${game_id}`);

      request.app.io.emit("game:created", {
        game_id,
        title
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).send();
    });

  // response.render("authenticated/gameroom.hbs", {
  //   title: "Game Room",
  //   game_id: id,
  //   game: "/public/js/gameroom.js",
  //   cards: "/public/js/cards.js",
  //   style: "../../public/stylesheets/gameroom.css",
  //   cardStyle: "../../public/stylesheets/cards.css"
  // });
});

router.get("/:id/:message", (request, resposne) => {
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

// router.get("/", (request, response) => {
//   response.render("authenticated/gameroom.hbs", {
//     title: "Game Room",
//     game: "/public/js/gameroom.js",
//     cards: "/public/js/cards.js",
//     style: "../../public/stylesheets/gameroom.css",
//     cardStyle: "../../public/stylesheets/cards.css"
//   });
// });

module.exports = router;
