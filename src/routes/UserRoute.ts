import { Router } from 'express';
import { UserController } from "./../controllers/UserController"
import { CowController } from "./../controllers/CowController"
import { ObservationController } from "./../controllers/ObservationController";
import { ProductController } from "./../controllers/ProductController";
import { TempRecordController } from "./../controllers/TempRecordController";
import { checkJwt } from "./../middlewares/jwt";
import { PurchaseController } from '../controllers/PurchaseController';
import { PaymentController } from '../controllers/PaymentController';
const router = Router();

//USERS ROUTES
router.post('/', UserController.createUser);

//OBSERVATIONS ROUTES
router.get('/', [checkJwt], UserController.getAllUsers);
router.get('/observations', [checkJwt], ObservationController.getObservations);
router.get('/observations/bycow/:id', [checkJwt], ObservationController.getObservationsByCow);
router.put('/observations/:id', [checkJwt], ObservationController.updateObservation);
router.delete('/observations/:id', [checkJwt], ObservationController.deleteObservation);
router.post('/new-observation', [checkJwt], ObservationController.newObservation);

//COWS ROUTES
router.post('/new-cow', [checkJwt], [checkJwt], CowController.newCow);
router.get('/cows', [checkJwt], CowController.getCows);
router.put('/cows/:id', [checkJwt], CowController.updateCow);
router.patch('/cows/:id', [checkJwt], CowController.updateActiveCow);

//PRODUCTS ROUTES
router.post('/products', [checkJwt], ProductController.newProduct);
router.get('/products', [checkJwt], ProductController.getProducts);
router.get('/products/:id', [checkJwt], ProductController.getProductById);
router.get('/products/name-match/:text', [checkJwt], ProductController.getMatchingProductsByName);
router.put('/products/:id', [checkJwt], ProductController.updateProduct);
router.delete('/products/:id', [checkJwt], ProductController.deleteProduct);

//TEMP RECORDS ROUTES
router.get('/temp-records', [checkJwt], TempRecordController.getTempRecords);
router.get('/temp-records/bydates/:from/:to', [checkJwt], TempRecordController.getTempRecordsByDates);
router.get('/temp-records/:id', [checkJwt], TempRecordController.getTempRecorById);
router.post('/temp-records', [checkJwt], TempRecordController.newTempRecord);
router.put('/temp-records/:id', [checkJwt], TempRecordController.updateTempRecord);
router.delete('/temp-records/:id', [checkJwt], TempRecordController.deleteTempRecord);

//PURCHASES ROUTES
router.get("/purchases", [checkJwt], PurchaseController.getPurchases);
router.get("/purchases-by-payment-status/:status", [checkJwt], PurchaseController.getPurchaseByPaymentStatus);
router.get("/purchases/:id", [checkJwt], PurchaseController.getPurchaseById);
router.post("/purchases", [checkJwt], PurchaseController.newPurchase);
router.put("/purchases/:id", [checkJwt], PurchaseController.updatePurchase);
router.patch('/purchases/:id', [checkJwt], PurchaseController.updatePaidPurchase);
router.delete('/purchases/:id', [checkJwt], PurchaseController.deletePurchase);
router.patch('/purchases/:id', [checkJwt], PurchaseController.updatePaidPurchase);
router.delete('/purchases/items/:id', [checkJwt], PurchaseController.deleteItem);

//PAYMENTS
router.get('/payments', [checkJwt], PaymentController.getPayments);
router.get('/payments/:id', [checkJwt], PaymentController.getPaymentById);
router.post('/payments', [checkJwt], PaymentController.newPayment);

export default router;