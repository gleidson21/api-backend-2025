

// src/config/database.js
const isProduction = process.env.NODE_ENV === 'production';

export default {
  // Condição para usar a URL de produção do Render
  url: isProduction ? process.env.DATABASE_URL : `postgresql://postgres:postgres@localhost:5433/devburger`,
  dialect: 'postgres',
  dialectOptions: {
    ssl: isProduction ? {
      require: true,
      rejectUnauthorized: false
    } : false
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};