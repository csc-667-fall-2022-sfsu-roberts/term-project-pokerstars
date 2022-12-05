"use strict";
const cards = require("../config/cards");
const { CARD_FACE_VALUES, CARD_SUITS } = cards;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cards", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      suit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      faceValue: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });

    const GENERATED_CARDS = CARD_SUITS.reduce((memo, suit) => {
      CARD_FACE_VALUES.forEach((faceValue) => {
        memo.push({ suit, faceValue });
      });

      return memo;
    }, []);

    await queryInterface.bulkInsert("cards", GENERATED_CARDS);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cards");
  }
};
