const db = require("./index");

const CREATE_SQL =
  `INSERT INTO gameroom_chats (gameroom_id, user_id, comment)
   VALUES ` + "(${gameroom_id}, ${user_id}, ${comment})";

const ALL_CHAT_COMMENTS =
  `SELECT *
  FROM gameroom_chats
  WHERE gameroom_chats.gameroom_id =` + "${gameroom_id}";

const create = (gameroom_id, user_id, comment) => {
  return db.none(CREATE_SQL, { gameroom_id, user_id, comment });
};

module.exports = { create };
