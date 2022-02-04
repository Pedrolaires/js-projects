"use strict";const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'users',
    [
      {
        nome: 'Luiz',
        email: 'luiz1@gmail.com',
        password_hash: await bcrypt.hash('1SAD@#fas23456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Luiz2',
        email: 'luiz2@gmail.com',
        password_hash: await bcrypt.hash('123!@!$1241256', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Luiz3',
        email: 'luiz3@gmail.com',
        password_hash: await bcrypt.hash('12353312adaW@#456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],

    {},
  ),

  down: () => {},
};
