import { Router } from 'express';
import { AuthController } from "./../controllers/AuthController";
import { checkJwt } from "./../middlewares/jwt";

const router = Router();

router.post('/login', AuthController.login);

export default router;