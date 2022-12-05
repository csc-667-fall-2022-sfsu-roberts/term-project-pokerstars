const express = require("express");
const router = express.Router();
const Games = require("../../db/games");
const Gamerooms = require("../../db/gamerooms");

router.get("/", (request, response) => {
  const { username, userID } = request.session;

  Gamerooms.all(userID)
    .then((gamerooms) =>
      response.render("authenticated/lobby.pug", {
        gameTitle: "Poker Stars",
        username,
        userID,
        gamerooms
      })
    )
    .catch((error) => {
      console.log(error);
      response.status(500).send();
    });
});

// router.get("/", (request, response) => {
//   const { username, userID } = request.session;

//   Games.all(userID)
//     .then((games) =>
//       response.render("authenticated/lobby.pug", {
//         gameTitle: "Poker Stars",
//         username,
//         userID,
//         games
//       })
//     )
//     .catch((error) => {
//       console.log(error);
//       response.status(500).send();
//     });
// });

module.exports = router;
