 src/app/models/Order.js
import { Model, DataTypes } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init({
      user_id: { // ID do usuário que fez o pedido
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: { // ID do produto comprado
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: { // Valor total do pedido
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      transaction_id: { // ID da transação do gateway de pagamento (token)
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Garante que cada ID de transação seja único
      },
      payment_status: { // Status do pagamento (aprovado, pendente, recusado)
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
      // Outros campos que você queira adicionar ao pedido (ex: data de entrega, endereço, etc.)
    }, {
      sequelize,
      tableName: 'orders', // Nome da tabela no banco de dados
      timestamps: true, // Adiciona createdAt e updatedAt automaticamente
      underscored: true, // Usa snake_case para nomes de colunas
    });
  }

  static associate(models) {
    // Associações (se o usuário e o produto já existirem como modelos)
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  }
}

export default Order;
