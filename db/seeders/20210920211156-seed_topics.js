'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Topics', [
      {
        name: 'Javascript',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ruby',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SQL',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Topics', null, {truncate: true, cascade: true, restartIdentity: true
      });
  }
};
