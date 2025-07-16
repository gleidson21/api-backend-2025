import usercontroller from "./app/controllers/Userscontrollers.js";
import authenticateToken from './app/middlewares/authenticateToken.js'
import { Router } from "express";
import SessionController from '../src/app/controllers/SessionController.js'

const router = new Router()

router.post('/users',usercontroller.store)
router.post('/login', SessionController.store);
router.delete('/users/:id', authenticateToken, usercontroller.delete)
router.get('/users', usercontroller.index);
router.get('/', (req, res) => {
  return res.send('API está funcionando!');
});

export default router