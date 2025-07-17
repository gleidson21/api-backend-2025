import { Model, DataTypes } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init({
      id: { // Se o ID dos pedidos também for UUID, ajuste aqui. Por padrão, deixei SERIAL (INTEGER)
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: { // ID do usuário que fez o pedido
        type: DataTypes.UUID, // ALTERADO: Deve ser UUID para corresponder ao ID do usuário
        allowNull: false,
      },
      product_id: { // ID do produto comprado
        type: DataTypes.INTEGER, // Assumindo que o ID do produto é INTEGER
        allowNull: false,
      },
      amount: { // Valor total do pedido
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      transaction_id: { // ID da transação do gateway de pagamento (token)
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      payment_status: { // Status do pagamento (aprovado, pendente, recusado)
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
