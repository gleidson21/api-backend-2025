// src/config/database.js
export default {
    url: 'postgresql://api_backend_db_ivd7_user:cQS9IggPZYwQ8qoIHNxOSxy23C2fPn16@dpg-d1ruuqemcj7s7394je70-a.oregon-postgres.render.com/api_backend_db_ivd7',
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
