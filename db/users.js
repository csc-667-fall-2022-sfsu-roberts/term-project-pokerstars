const bcrypt = require("bcrypt");
const db = require("./index");

const LOOKUP_USER_BY_USERNAME =
  "SELECT id FROM users WHERE username=${username}";

const REGISTER_USER =
  "INSERT INTO users (username, password) VALUES (${username}, ${password}) RETURNING id, username";

const LOGIN_USER =
  "SELECT id, username, password FROM users WHERE username=${username}";

const register = ({ username, password }) => {
  return db
    .none(LOOKUP_USER_BY_USERNAME, { username })
    .then(() => bcrypt.hash(password, 10))
    .then((hash) => db.one(REGISTER_USER, { username, password: hash }));
};

const login = ({ username, password }) => {
  return db
    .one(LOGIN_USER, { username })
    .then(({ id, username, password: encryptedPassword }) =>
      Promise.all([
        bcrypt.compare(password, encryptedPassword),
        { id, username }
      ])
    )
    .then(([result, { id, username }]) => {
      if (result) {
        return { id, username };
      } else {
        return Promise.reject("Please enter a valid username and password.");
      }
    });
};

module.exports = { register, login };
