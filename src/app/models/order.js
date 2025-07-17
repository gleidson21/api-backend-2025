src/app/models/Order.js
import { Model, DataTypes } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER, // Assumindo INTEGER para IDs de pedido (SERIAL no DB)
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID, // IMPORTANTE: Este deve corresponder ao tipo do ID do seu modelo User.js
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER, // Assumindo INTEGER para IDs de produto
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      transaction_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      payment_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
    }, {
      sequelize,
      tableName: 'orders',
      timestamps: true,
      underscored: true,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  }
}

export default Order;
