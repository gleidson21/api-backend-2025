'use strict';

 /** @type {import('sequelize-cli').Migration} */
export const up = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();
  const Sequelize = sequelize.constructor;
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER, // Ou Sequelize.UUID se o ID do pedido for UUID
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID, // ALTERADO: Deve ser UUID para corresponder ao ID do usuário
        allowNull: false,
        references: { model: 'users', key: 'id' }, // Chave estrangeira para a tabela users
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      product_id: {
        type: Sequelize.INTEGER, // Assumindo que o ID do produto é INTEGER
        allowNull: false,
        references: { model: 'products', key: 'id' }, // Chave estrangeira para a tabela products
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      transaction_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      payment_status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending',
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
  
  await queryInterface.dropTable('orders');
};