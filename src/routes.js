import usercontroller from "./app/controllers/Userscontrollers.js";
import authenticateToken from './app/middlewares/authenticateToken.js';
import isAdmin from './app/middlewares/isAdmin.js';
import { Router } from "express";
// Importa a instância já criada e exportada de SessionController
import sessionController from './app/controllers/SessionController.js'; 

const router = new Router();

router.post('/users', usercontroller.store);
// Usa a instância importada diretamente
router.post('/login', sessionController.store); 

// Rota para deletar um usuário (protegida por authenticateToken E isAdmin)
router.delete('/users/:id', authenticateToken, isAdmin, usercontroller.delete);

// Rota para listar usuários (protegida por authenticateToken E isAdmin)
router.get('/users', authenticateToken, isAdmin, usercontroller.index);

router.get('/', (req, res) => {
  return res.send('API está funcionando!');
});

export default router;