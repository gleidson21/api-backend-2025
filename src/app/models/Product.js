// src/app/models/Product.js
import { Model, DataTypes } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2), // Preço com 2 casas decimais
        allowNull: false,
      },
      image_url: { // URL da imagem do produto
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'products', // Nome da tabela no banco de dados
      timestamps: true, // Adiciona createdAt e updatedAt automaticamente
      underscored: true, // Usa snake_case para nomes de colunas (ex: image_url)
    });
  }

  static associate(models) {
    // Se no futuro um produto tiver associações (ex: com categorias ou pedidos), defina-as aqui.
    // Ex: this.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
  }
}

export default Product;
