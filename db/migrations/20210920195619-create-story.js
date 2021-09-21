'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Stories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {model:'Users'}
      },
      topicId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {model:'Topics'}
      },
      body: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      subTitle: {
        allowNull: false,
        type: Sequelize.STRING(50)
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Stories');
  }
};
