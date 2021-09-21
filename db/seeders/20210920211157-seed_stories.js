'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Stories', [
      {
        userId: 1,
        topicId: 1,
        body: "stuff",
        title:"For Loops",
        subTitle:"iteration",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        topicId: 2,
        body: "other stuff",
        title:"Variables",
        subTitle:"Assignment",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        topicId: 3,
        body: "more stuff",
        title:"Querying",
        subTitle:"Selectors",
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
