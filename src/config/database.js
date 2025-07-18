// src/config/database.js
import 'dotenv/config'; // Garante que as variáveis de ambiente sejam carregadas aqui também

export default {
  url: process.env.DATABASE_URL, // AGORA USA A VARIÁVEL DE AMBIENTE
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};

