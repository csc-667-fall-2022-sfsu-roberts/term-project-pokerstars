"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("community_cards", {
      game_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      card_one_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      card_two_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      card_three_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      turn_card_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      river_card_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("community_cards");
  }
};
