'use strict';

 /** @type {import('sequelize-cli').Migration} */
export const up = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();
  const Sequelize = sequelize.constructor;
  
  await queryInterface.createTable('products',  {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
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
  }

 export const down = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();
  
  await queryInterface.dropTable('products');
};