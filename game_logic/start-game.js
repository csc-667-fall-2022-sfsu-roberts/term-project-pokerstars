const db = require("../db/index");
const Games = require("../db/games");

const INITIAL_CARD_COUNT = 2;

const CHECK_IF_CARD_ASSIGNED =
  "SELECT * FROM game_cards WHERE game_id=${game_id} AND card_id=${randomIndex}";

const INSERT_COMMUNITY_CARDS =
  "INSERT INTO community_cards (game_id, card_one_id, card_two_id, card_three_id, turn_card_id, river_card_id) VALUES (${game_id}, ${card1}, ${card2}, ${card3}, ${turn}, ${river})";

const INSERT_PLAYER_CARDS =
  "INSERT INTO player_cards (game_id, user_id, card_one, card_two) VALUES (${game_id}, ${user_id}, ${player_card1}, ${player_card2})";

const GET_GAMEROOM_PLAYERS =
  "SELECT * FROM gameroom_users WHERE gameroom_id=${gameroom_id}";

const ASSIGN_PLAYER_SEAT =
  "UPDATE gameroom_users SET seat=${seat} WHERE user_id=${user_id}";

const SET_CURRENT_USER =
  "UPDATE game_users SET current=true WHERE user_id=${user_id}";

const getGameroomPlayers = (gameroom_id) => {
  return db.any(GET_GAMEROOM_PLAYERS, { gameroom_id });
};

const assignSeats = (players, gameroom_id) => {
  for (i = 0; i < players.length; i++) {
    player = players[i];
    user_id = player.user_id;
    seat = i + 1;

    db.none(ASSIGN_PLAYER_SEAT, { seat, user_id });
  }

  user_id = players[0].user_id;
  db.none(SET_CURRENT_USER, { user_id });

  return getGameroomPlayers(gameroom_id);
};

const assignCards = async (gameroom_id, game_id, gameCards) => {
  let players = await getGameroomPlayers(gameroom_id);
  let player1 = players[0];
  let player2 = players[1];

  // console.log("Game id: " + game_id);
  // console.log(players);
  // console.log(gameCards);
  card1 = gameCards[0].card_id;
  card2 = gameCards[1].card_id;
  card3 = gameCards[2].card_id;
  turn = gameCards[3].card_id;
  river = gameCards[4].card_id;

  db.none(INSERT_COMMUNITY_CARDS, {
    game_id,
    card1,
    card2,
    card3,
    turn,
    river
  });

  player_card1 = gameCards[5].card_id;
  player_card2 = gameCards[6].card_id;
  let user_id = players[0].user_id;
  db.none(INSERT_PLAYER_CARDS, {
    game_id,
    user_id,
    player_card1,
    player_card2
  });

  player_card1 = gameCards[7].card_id;
  player_card2 = gameCards[8].card_id;
  user_id = players[1].user_id;
  db.none(INSERT_PLAYER_CARDS, {
    game_id,
    user_id,
    player_card1,
    player_card2
  });

  return players;
};

const drawInitialCards = (game_id) => (players) =>
  Promise.all([
    players,
    Games.getNextDrawableCards(game_id, players.length * INITIAL_CARD_COUNT)
  ]);

const initialize = (gameroom_id, game_id) => {
  return Games.initDeck(game_id)
    .then((gameCards) => assignCards(gameroom_id, game_id, gameCards))
    .then((players) => assignSeats(players, gameroom_id));
  // .then(() => Games.getPlayers(game_id))
  // .then(setSeats(game_id))
  // .then(drawInitialCards(game_id))
  // .then(assignCards(game_id));
};

module.exports = { initialize, getGameroomPlayers };
