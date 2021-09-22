'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Stories', [
      {
        userId: 1,
        topicId: 1,
        body: "stuff",
        title:"For Loops",
        subtitle:"iteration",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        topicId: 2,
        body: "other stuff",
        title:"Variables",
        subtitle:"Assignment",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        topicId: 3,
        body: "more stuff",
        title:"Querying",
        subtitle:"Selectors",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Stories', null, {truncate: true, cascade: true, restartIdentity: true
      });
  }
};
