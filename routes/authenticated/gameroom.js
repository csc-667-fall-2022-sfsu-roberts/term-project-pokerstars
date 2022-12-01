const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  response.render("authenticated/gameroom.hbs", {
    title: "Game Room",
    js: "/public/js/gameroom.js",
    style: "../../public/stylesheets/gameroom.css"
  });
});

module.exports = router;
