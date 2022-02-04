"use strict";module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('fotos', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    aluno_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'alunos',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    originalname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    filename: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('fotos'),
};

// npx sequelize migration:create --name=criar-tabela-de-fotos-do-aluno
