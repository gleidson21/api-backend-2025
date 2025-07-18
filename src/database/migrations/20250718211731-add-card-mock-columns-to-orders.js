'use strict';

 /** @type {import('sequelize-cli').Migration} */
export const up = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();
  const Sequelize = sequelize.constructor;{
    await queryInterface.addColumn('orders', 'card_number_mock', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('orders', 'expiry_date_mock', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('orders', 'cvv_mock', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('orders', 'card_number_mock');
    await queryInterface.removeColumn('orders', 'expiry_date_mock');
    await queryInterface.removeColumn('orders', 'cvv_mock');
  }
};