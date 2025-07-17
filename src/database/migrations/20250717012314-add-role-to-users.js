'use strict';

/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.addColumn('users', 'role', {
    type: Sequelize.ENUM('user', 'admin'),
    defaultValue: 'user',
    allowNull: false,
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.removeColumn('users', 'role');
};