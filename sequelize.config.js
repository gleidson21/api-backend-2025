import dotenv from 'dotenv';
dotenv.config();

const config = {
  dialect: 'postgres',
  url: process.env.DATABASE_URL,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};

export default {
  development: config,
  test: config,
  production: config,
};