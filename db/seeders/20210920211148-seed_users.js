'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lastName: "Doe",
        email: "d@email.com",
        hashedPassword: bcrypt.hashSync("password",10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Andrew',
        lastName: "Fava",
        email: "af@email.com",
        hashedPassword: bcrypt.hashSync("password",10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Noah',
        lastName: "Garcia",
        email: "NG@email.com",
        hashedPassword: bcrypt.hashSync("password",10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Harrison',
        lastName: "Gerdes",
        email: "hg@email.com",
        hashedPassword: bcrypt.hashSync("password",10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {truncate: true, cascade: true, restartIdentity: true
      });
  }
};
