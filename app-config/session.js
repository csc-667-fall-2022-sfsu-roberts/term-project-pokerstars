const session = require("express-session");

const sessionInstance = session({
  secret: "adfasjaklhdfalkjdshfalkjsdhf",
  cookie: { maxAge: 24 * 60 * 60 },
  resave: false,
  saveUninitialized: true
});

module.exports = sessionInstance;
