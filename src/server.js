import 'dotenv/config'; // Garante que as variáveis de ambiente sejam carregadas
import express from 'express'; // ESSENCIAL: Importa o módulo 'express' aqui!
import path from 'path'; // Importa o módulo 'path'
import { fileURLToPath } from 'url'; // Importa para lidar com __dirname em módulos ES

import app from './app/app.js'; // Importa a instância do Express já configurada de app.js
import userRoute from './routes.js'; // Importa suas rotas
import './database/index.js'; // ESSENCIAL: Importa e executa a conexão com o DB e inicializa os modelos!

// Definindo __filename e __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
    // --- Middleware para servir arquivos estáticos da pasta 'public' ---
    // Este é o caminho correto se 'public' está DENTRO de 'src'.
    app.use(express.static(path.join(__dirname, 'public')));
    console.log(`Servindo arquivos estáticos de: ${path.join(__dirname, 'public')}`);


    // Configura para servir arquivos estáticos da pasta 'assets' (se ela existir na raiz do projeto)
    // Se 'assets' estiver na raiz do projeto e 'server.js' estiver em 'src',
    // precisamos voltar um nível (..) para acessá-la.
    app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
    console.log('Servindo arquivos estáticos de ../assets');

    // Usa as rotas no aplicativo Express
    app.use(userRoute);

    // Define a porta do servidor
    const PORT = process.env.PORT || 3000; // Usa a porta do .env ou 3000 como padrão

    // Inicia o servidor
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
        console.log(`URL da aplicação: ${process.env.APP_URL || `http://localhost:${PORT}`}`);
    });
} catch (error) {
    console.error('ERRO CRÍTICO na inicialização do servidor:', error.message);
    console.error('Detalhes do erro:', error); // Loga o objeto de erro completo
    process.exit(1); // Garante que o processo saia com um status de erro
}

