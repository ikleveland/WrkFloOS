'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Leadsms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sent: {
        type: Sequelize.STRING
      },
      recieved: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      localNumber: {
        type: Sequelize.STRING
      },
      lead_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Leads',
          key: 'id'
        },
        allowNull: false
      },
      custom: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Leadsms');
  }
};