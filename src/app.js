// src/app.js
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
// Ele vai procurar por arquivos na pasta 'public' na raiz do seu projeto.
// Certifique-se de que seus arquivos HTML (login.html, loja.html, admin.html)
// e os arquivos CSS/JS que eles usam estejam DENTRO desta pasta 'public'.
app.use(express.static(path.join(__dirname, '..', 'public')));
// O '..' antes de 'public' é porque 'app.js' está em 'src', então 'public'
// está um nível acima na estrutura de pastas. Se 'public' estiver na mesma
// pasta que 'src', use path.join(__dirname, 'public').

export default app;
