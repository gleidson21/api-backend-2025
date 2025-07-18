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
        type: DataTypes.UUID, // IMPORTANTE: Este deve corresponder ao tipo do ID do seu modelo User.js (se User.id for UUID)
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
      payment_status: { // Renomeado de paymentStatus para payment_status para consistência com underscored: true
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
      // NOVOS CAMPOS PARA DADOS DE CARTÃO (APENAS PARA FINS DE TESTE/SIMULAÇÃO)
      // EM PRODUÇÃO, ESTES CAMPOS NUNCA DEVERIAM EXISTIR OU DEVERIAM SER CRIPTOGRAFADOS/TOKENIZADOS
      card_number_mock: { // Nome alterado para deixar claro que é mock
        type: DataTypes.STRING,
        allowNull: true, // Pode ser nulo se não for fornecido
      },
      expiry_date_mock: { // Nome alterado para deixar claro que é mock
        type: DataTypes.STRING,
        allowNull: true,
      },
      cvv_mock: { // Nome alterado para deixar claro que é mock
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'orders',
      timestamps: true,
      underscored: true, // Garante que paymentStatus se torna payment_status no DB
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  }
}

export default Order;

