const db = require("./index");

const CREATE_SQL =
  `INSERT INTO games (title)
VALUES ` +
  "(${title})" +
  `RETURNING id`;

const ADD_USER_SQL =
  `INSERT INTO game_users (game_id, user_id)
  VALUES ` +
  "(${game_id}, ${user_id})" +
  `RETURNING game_id`;

const ALL_GAMES_SQL = `SELECT *
FROM games`;

const ACTIVE_GAMES =
  `SELECT id, title
  FROM games
  LEFT JOIN game_users
  ON games.id = game_users.game_id
  WHERE game_users.user_id=` + "${user_id}";

const JOINABLE_GAMES =
  `SELECT *
  FROM games
  WHERE id NOT IN (
    SELECT id
    FROM games
    LEFT JOIN game_users
    ON games.id = game_users.game_id
    WHERE game_users.user_id=` + "${user_id})";

const CHECK_ACTIVE_GAMES =
  `SELECT *
    FROM game_users
    WHERE game_id=` +
  "${game_id}" +
  `AND user_id=` +
  "${user_id}";

const create = (user_id, title = "Game") => {
  return db.one(CREATE_SQL, { title }).then(({ id }) => {
    return addUser(user_id, id);
  });
};

const addUser = (user_id, game_id) => {
  return db.one(ADD_USER_SQL, { game_id, user_id });
};

const all = (user_id) => {
  return Promise.all([
    db.any(ACTIVE_GAMES, { user_id }),
    db.any(JOINABLE_GAMES, { user_id })
  ]).then(([active, joinable]) => ({ active, joinable }));
};

const join = (game_id, user_id) => {
  return db
    .none(CHECK_ACTIVE_GAMES, { game_id, user_id })
    .then(() => db.one(ADD_USER_SQL, { game_id, user_id }));
};

module.exports = { create, all, addUser, join };
