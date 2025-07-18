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

// Gerenciamento de Usuários (Apenas Admin)
routes.get('/users', authenticateToken, isAdmin, UsersController.index); // Listar usuários
routes.delete('/users/:id', authenticateToken, isAdmin, UsersController.delete); // Deletar usuário

// Rotas de Produto
routes.post('/products', authenticateToken, isAdmin, ProductController.store); // Criar produto
routes.get('/products', ProductController.index); // Listar produtos (público)
routes.get('/products/:id', ProductController.show); // Obter produto único (público)
routes.put('/products/:id', authenticateToken, isAdmin, ProductController.update); // Atualizar produto
routes.delete('/products/:id', authenticateToken, isAdmin, ProductController.delete); // Deletar produto

// Rotas de Pagamento
routes.post('/process-payment', authenticateToken, PaymentController.processPayment); // Processar pagamento
routes.get('/transactions', authenticateToken, isAdmin, PaymentController.listTransactions); // Listar transações

export default routes;
