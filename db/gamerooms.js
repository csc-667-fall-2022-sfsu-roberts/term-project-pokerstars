const db = require("./index");

const CREATE_SQL =
  `INSERT INTO gamerooms (title)
VALUES ` +
  "(${title})" +
  `RETURNING id`;

const ADD_USER_SQL =
  `INSERT INTO gameroom_users (gameroom_id, user_id)
  VALUES ` +
  "(${gameroom_id}, ${user_id})" +
  `RETURNING gameroom_id`;

const ALL_GAMEROOMS_SQL = `SELECT *
FROM gamerooms`;

const ACTIVE_GAMEROOMS =
  `SELECT id, title
  FROM gamerooms
  LEFT JOIN gameroom_users
  ON gamerooms.id = gameroom_users.gameroom_id
  WHERE gameroom_users.user_id=` + "${user_id}";

const JOINABLE_GAMEROOMS =
  `SELECT *
  FROM gamerooms
  WHERE id NOT IN (
    SELECT id
    FROM gamerooms
    LEFT JOIN gameroom_users
    ON gamerooms.id = gameroom_users.gameroom_id
    WHERE gameroom_users.user_id=` + "${user_id})";

const CHECK_ACTIVE_GAMEROOMS =
  `SELECT *
    FROM gameroom_users
    WHERE gameroom_id=` +
  "${gameroom_id}" +
  `AND user_id=` +
  "${user_id}";

const create = (user_id, title = "Gameroom") => {
  return db.one(CREATE_SQL, { title }).then(({ id }) => {
    return addUser(user_id, id);
  });
};

const addUser = (user_id, gameroom_id) => {
  return db.one(ADD_USER_SQL, { gameroom_id, user_id });
};

const all = (user_id) => {
  return Promise.all([
    db.any(ACTIVE_GAMEROOMS, { user_id }),
    db.any(JOINABLE_GAMEROOMS, { user_id })
  ]).then(([active, joinable]) => ({ active, joinable }));
};

const join = (gameroom_id, user_id) => {
  return db
    .none(CHECK_ACTIVE_GAMEROOMS, { gameroom_id, user_id })
    .then(() => db.one(ADD_USER_SQL, { gameroom_id, user_id }));
};

module.exports = { create, all, addUser, join };
