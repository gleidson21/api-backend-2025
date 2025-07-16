'use strict';

/** @type {import('sequelize-cli').Migration} */
export const up = async (context) => {
  const { queryInterface, Sequelize } = context;

  await queryInterface.createTable('users', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: Sequelize.STRING,
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
};

export const down = async (context) => {
  const { queryInterface } = context;
  
  await queryInterface.dropTable('users');
};