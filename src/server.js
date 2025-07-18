import 'dotenv/config'; // Garante que as variáveis de ambiente sejam carregadas
import express from 'express';
// IMPORTANTE: Ajustando os caminhos de importação para serem relativos à raiz do repositório
// Isso é um workaround para o problema de resolução de caminhos no Render (src/src/)
import app from './src/app.js'; // Assume que server.js é executado da raiz do repositório
import userRoute from './src/routes.js'; // Assume que server.js é executado da raiz do repositório
import './src/database/index.js'; // Assume que server.js é executado da raiz do repositório

try {
    // Configura para servir arquivos estáticos da pasta 'assets'
    // Assumindo que 'assets' está na raiz do seu repositório
    app.use('/assets', express.static('./assets')); // Caminho ajustado para a raiz do repositório
    console.log('Servindo arquivos estáticos de ./assets (ajustado para a raiz do repositório)');


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
