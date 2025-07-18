import express from 'express';
import cors from 'cors';
import path from 'path'; // Importa o módulo 'path'
import { fileURLToPath } from 'url'; // Importa para lidar com __dirname em módulos ES

// Se estiver usando módulos ES (import/export), você precisa definir __dirname
// para que 'path.join' funcione corretamente.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware para habilitar o Express a ler requisições em formato JSON
app.use(express.json());

// Middleware para habilitar o CORS
app.use(cors());

// --- NOVO: Middleware para servir arquivos estáticos (HTML, CSS, JS do frontend) ---
// O caminho agora aponta diretamente para a pasta 'public' dentro de 'src'.
app.use(express.static(path.join(__dirname, 'public')));
//                                        ^^^^^^^
//                                        Removido o '..'

export default app;

