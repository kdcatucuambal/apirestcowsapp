import { Router } from 'express';
import { UserController } from "./../controllers/UserController"
import { CowController } from "./../controllers/CowController"
import { ObservationController } from "./../controllers/ObservationController";
import { checkJwt } from "./../middlewares/jwt";
const router = Router();

router.get('/', [checkJwt], UserController.getAllUsers);
router.get('/observations', ObservationController.getObservations)
router.get('/observations/bycow/:id', ObservationController.getObservationsByCow)

router.post('/', UserController.createUser)
router.post('/new-cow', [checkJwt], [checkJwt], CowController.newCow)
router.get('/cows', [checkJwt], CowController.getCows)
router.put('/cows/:id', [checkJwt], CowController.updateCow);
router.patch('/cows/:id', [checkJwt], CowController.updateActiveCow);


export default router;