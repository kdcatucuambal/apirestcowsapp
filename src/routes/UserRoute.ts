import { Router } from 'express';
import { UserController } from "./../controllers/UserController"
import { CowController } from "./../controllers/CowController"
import { checkJwt } from "./../middlewares/jwt";
const router = Router();

router.get('/', [checkJwt], UserController.getAllUsers);
router.post('/', UserController.createUser)
router.post('/new-cow', [checkJwt], CowController.newCow)
router.get('/cows', [checkJwt], CowController.getCows)


export default router;