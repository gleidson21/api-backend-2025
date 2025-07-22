import express from 'express';
import cors from 'cors';
import routes from './routes.js'
const app = express();

// Middleware para habilitar o Express a ler requisições em formato JSON
app.use(express.json());

// Middleware para habilitar o CORS
app.use(cors());
app.use(routes);
export default app;
