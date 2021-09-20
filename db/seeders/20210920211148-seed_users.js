'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lastName: "Doe",
        email: "d@email.com",
        hashedPassword: "password",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Andrew',
        lastName: "Fava",
        email: "af@email.com",
        hashedPassword: "password",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Noah',
        lastName: "Garcia",
        email: "NG@email.com",
        hashedPassword: "password",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Harrison',
        lastName: "Gerdes",
        email: "hg@email.com",
        hashedPassword: "password",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {returning: true});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {truncate: true, cascade: true, restartIdentity: true
      });
  }
};
