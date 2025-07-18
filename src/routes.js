import { Router } from 'express';
import SessionController from './app/controllers/SessionController.js';
import UsersController from './app/controllers/UsersController.js';
import ProductController from './app/controllers/ProductController.js';
import PaymentController from './app/controllers/PaymentController.js';
import authenticateToken from './app/middlewares/authenticateToken.js';
import isAdmin from './app/middlewares/isAdmin.js';

const routes = new Router();

// Rotas de Autenticação/Usuário
routes.post('/register', UsersController.store); // Criar usuário
routes.post('/login', SessionController.store); // Login

// Gerenciamento de Usuários (Apenas Admin - MANTÉM AUTENTICAÇÃO)
routes.get('/users', authenticateToken, isAdmin, UsersController.index); // Listar usuários
routes.delete('/users/:id', authenticateToken, isAdmin, UsersController.delete); // Deletar usuário

// Rotas de Produto
routes.post('/products', authenticateToken, isAdmin, ProductController.store); // Criar produto (MANTÉM AUTENTICAÇÃO)
routes.get('/products', ProductController.index); // Listar produtos (público - já sem autenticação)
routes.get('/products/:id', ProductController.show); // Obter produto único (público - já sem autenticação)
routes.put('/products/:id', authenticateToken, isAdmin, ProductController.update); // Atualizar produto (MANTÉM AUTENTICAÇÃO)
routes.delete('/products/:id', authenticateToken, isAdmin, ProductController.delete); // Deletar produto (MANTÉM AUTENTICAÇÃO)

// Rotas de Pagamento
// ATENÇÃO: authenticateToken REMOVIDO AQUI APENAS PARA TESTE. REATIVE EM PRODUÇÃO!
routes.post('/process-payment', PaymentController.processPayment); // Processar pagamento (AGORA SEM AUTENTICAÇÃO)
routes.get('/transactions', authenticateToken, isAdmin, PaymentController.listTransactions); // Listar transações (MANTÉM AUTENTICAÇÃO, pois é admin)

export default routes;
