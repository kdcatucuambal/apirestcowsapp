import { Router } from 'express';
import { UserController } from "./../controllers/UserController"
import { CowController } from "./../controllers/CowController"
import { ObservationController } from "./../controllers/ObservationController";
import { checkJwt } from "./../middlewares/jwt";
const router = Router();

router.get('/', [checkJwt], UserController.getAllUsers);
router.get('/observations', [checkJwt], ObservationController.getObservations)
router.get('/observations/bycow/:id', [checkJwt], ObservationController.getObservationsByCow)

router.post('/', UserController.createUser)
router.post('/new-cow', [checkJwt], [checkJwt], CowController.newCow)
router.post('/new-observation', [checkJwt], ObservationController.newObservation)

router.put('/observations/:id', [checkJwt], ObservationController.updateObservation);
router.delete('/observations/:id', [checkJwt], ObservationController.deleteObservation);

router.get('/cows', [checkJwt], CowController.getCows)
router.put('/cows/:id', [checkJwt], CowController.updateCow);
router.patch('/cows/:id', [checkJwt], CowController.updateActiveCow);


export default router;