import Sequelize from 'sequelize';
import databaseConfig from '../config/database.js'; // Importa sua configuração de banco de dados

// Importa todos os seus modelos
import User from '../app/models/User.js';
import Product from '../app/models/Product.js';
import Order from '../app/models/order.js'

// Coloque todos os seus modelos em um array
const models = [User, Product, Order];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Inicializa a conexão com o banco de dados usando a configuração
    this.connection = new Sequelize(databaseConfig.url, databaseConfig);

    // Itera sobre todos os modelos e inicializa cada um com a conexão
    models.forEach(model => model.init(this.connection));

    // Itera sobre todos os modelos e chama o método 'associate' se ele existir
    // Isso é crucial para configurar as relações entre as tabelas (ex: User tem muitos Orders)
    models.forEach(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
