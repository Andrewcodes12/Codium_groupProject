'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Stories', [
      {
        userId: 1,
        topicId: 1,
        body: "stuff",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        topicId: 2,
        body: "other stuff",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        topicId: 3,
        body: "more stuff",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {returning: true});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Stories', null, {truncate: true, cascade: true, restartIdentity: true
      });
  }
};
