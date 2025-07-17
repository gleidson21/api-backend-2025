// src/routes.js
import usercontroller from "./app/controllers/Userscontrollers.js";
import authenticateToken from './app/middlewares/authenticateToken.js';
import isAdmin from './app/middlewares/isAdmin.js';
import { Router } from "express";
import sessionController from './app/controllers/SessionController.js';
import paymentController from './app/controllers/PaymentController.js'; // Importe o controlador de pagamento
import productController from './app/controllers/ProductController.js'; // Importe o controlador de produto

const router = new Router();

// Rotas de Usuário e Autenticação
router.post('/users', usercontroller.store); // Rota de cadastro de usuário
router.post('/login', sessionController.store); // Rota de login

// Rotas de Usuário Protegidas (requerem autenticação e isAdmin)
router.delete('/users/:id', authenticateToken, isAdmin, usercontroller.delete);
router.get('/users', authenticateToken, isAdmin, usercontroller.index);

// Rotas de Pagamento (requerem autenticação)
router.post('/process-payment', authenticateToken, paymentController.processPayment);
router.get('/transactions', authenticateToken, isAdmin, paymentController.listTransactions);

// Rotas de Produto
// Para criar, atualizar e deletar produtos, geralmente é necessário ser admin.
// Para listar produtos (GET /products), pode ser público ou protegido, dependendo da sua necessidade.
// Deixei a listagem pública para a loja funcionar, e as outras protegidas.
router.post('/products', authenticateToken, isAdmin, productController.store); // Criar produto
router.get('/products', productController.index); // Listar todos os produtos (acessível pela loja)
router.get('/products/:id', productController.show); // Obter um produto específico
router.put('/products/:id', authenticateToken, isAdmin, productController.update); // Atualizar produto
router.delete('/products/:id', authenticateToken, isAdmin, productController.delete); // Deletar produto

// Rota de teste da API
router.get('/', (req, res) => {
  return res.send('API está funcionando!');
});

export default router;
