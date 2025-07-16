// src/app.js
import express from 'express';
import cors from 'cors';

const app = express();

// Middleware para habilitar o Express a ler requisições em formato JSON
app.use(express.json());

// Middleware para habilitar o CORS
app.use(cors());

export default app;