import 'dotenv/config'; // Garante que as variáveis de ambiente sejam carregadas
import express from 'express';

import app from './app.js'; // Importa a instância do Express já configurada de app.js
import userRoute from './routes.js'; // Importa suas rotas
import './database/index.js'; // ESSENCIAL: Importa e executa a conexão com o DB e inicializa os modelos!

try {

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


