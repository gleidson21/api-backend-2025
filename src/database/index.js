// src/database/index.js
import 'dotenv/config'
import Sequelize from 'sequelize';
import databaseConfig from '../config/database.js';
import User from '../app/models/User.js';
const sequelize = new Sequelize(process.env.DATABASE_URL);
const connection = new Sequelize(databaseConfig.url, databaseConfig);

User.init(connection);

export default connection;