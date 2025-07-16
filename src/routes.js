import usercontroller from "./app/controllers/Usercontrollers.js";
import { Router } from "express";

const router = new Router()

router.post('/users',usercontroller.store)
router.get('/users', usercontroller.index);
routes.get('/', (req, res) => {
  return res.send('API está funcionando!');
});

export default router