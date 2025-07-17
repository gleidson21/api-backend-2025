import usercontroller from "./app/controllers/Userscontrollers.js";
import authenticateToken from './app/middlewares/authenticateToken.js';
import isAdmin from './app/middlewares/isAdmin.js'; // Certifique-se de que este caminho está correto
import { Router } from "express";
import SessionController from './app/controllers/SessionController.js'; // Certifique-se de que este caminho está correto

const router = new Router();

router.post('/users', usercontroller.store);
router.post('/login', SessionController.store);

// Rota para deletar um usuário (agora protegida por authenticateToken E isAdmin)
router.delete('/users/:id', authenticateToken, isAdmin, usercontroller.delete);

// Rota para listar usuários (agora protegida por authenticateToken E isAdmin)
router.get('/users', authenticateToken, isAdmin, usercontroller.index);

router.get('/', (req, res) => {
  return res.send('API está funcionando!');
});

export default router;