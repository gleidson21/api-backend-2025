import usercontroller from "./app/controllers/usercontrollers.js";
import { Router } from "express";

const router = new Router()

router.post('/users',usercontroller.store)
router.get('/users', usercontroller.index);
router.get('/', (req, res) => {
  return res.send('API está funcionando!');
});

export default router