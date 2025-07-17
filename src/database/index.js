// src/database/index.js
import Sequelize from 'sequelize';
import databaseConfig from '../config/database.js';

// Importa todos os seus modelos
import User from '../app/models/User.js';
import Product from '../app/models/Product.js';
import Order from '../app/models/Order.js'; // Caminho relativo correto para Order.js

// Coloque todos os seus modelos em um array
const models = [User, Product, Order];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig.url, databaseConfig);

    models.forEach(model => model.init(this.connection));
    models.forEach(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
