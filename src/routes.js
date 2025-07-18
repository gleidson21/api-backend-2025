import { Router } from 'express';
import SessionController from './app/controllers/SessionController.js';
import UsersController from './app/controllers/UsersController.js';
import ProductController from './app/controllers/ProductController.js';
import PaymentController from './app/controllers/PaymentController.js';
import authenticateToken from './app/middlewares/authenticateToken.js';
import isAdmin from './app/middlewares/isAdmin.js';

const routes = new Router();

// Rotas de Autenticação/Usuário
routes.post('/register', UsersController.store);
routes.post('/login', SessionController.store);

// Gerenciamento de Usuários (Apenas Admin)
// A rota GET /users requer autenticação E que o usuário seja admin
routes.get('/users', authenticateToken, isAdmin, UsersController.index); // <--- ESTA É A ROTA QUE ESTÁ A CAUSAR O PROBLEMA
routes.delete('/users/:id', authenticateToken, isAdmin, UsersController.delete);

// Rotas de Produto
routes.post('/products', authenticateToken, isAdmin, ProductController.store);
routes.get('/products', ProductController.index); // Público, sem autenticação
routes.get('/products/:id', ProductController.show); // Público, sem autenticação
routes.put('/products/:id', authenticateToken, isAdmin, ProductController.update);
routes.delete('/products/:id', authenticateToken, isAdmin, ProductController.delete);

// Rotas de Pagamento
routes.post('/process-payment', authenticateToken, PaymentController.processPayment);
routes.get('/transactions', authenticateToken, isAdmin, PaymentController.listTransactions);

export default routes;

