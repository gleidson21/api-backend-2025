// src/database/index.js
import Sequelize from 'sequelize';
import databaseConfig from '../config/database.js';
import User from '../app/models/User.js';

const connection = new Sequelize(databaseConfig.url, databaseConfig);

User.init(connection);

export default connection;