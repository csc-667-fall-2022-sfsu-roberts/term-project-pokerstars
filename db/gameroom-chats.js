const db = require("./index");

const CREATE_SQL =
  `INSERT INTO gameroom_chats (gameroom_id, username, comment, timestamp)
   VALUES ` + "(${gameroom_id}, ${username}, ${comment}, ${timestamp})";

const LAST_50_COMMENTS =
  `SELECT *
  FROM gameroom_chats
  WHERE gameroom_chats.gameroom_id =` +
  "${gameroom_id}" +
  "ORDER BY gameroom_chats.createdAt DESC";

const ALL_CHAT_COMMENTS =
  `SELECT *
  FROM gameroom_chats
  WHERE gameroom_chats.gameroom_id =` + "${gameroom_id}";

const create = (gameroom_id, username, comment, timestamp) => {
  return db.none(CREATE_SQL, { gameroom_id, username, comment, timestamp });
};

const all = (gameroom_id) => {
  return db.any(ALL_CHAT_COMMENTS, { gameroom_id });
};

module.exports = { create, all };
