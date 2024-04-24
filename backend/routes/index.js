import express from 'express';
const router = express.Router();
import registerController from '../controllers/auth/registerController.js';
import loginController from '../controllers/auth/loginController.js';
import auth from '../middleware/auth.js';
import userController from '../controllers/auth/userController.js';
import refreshController from '../controllers/auth/refreshController.js';
import cardController from '../controllers/cardController.js';

router.post('/register', registerController.register);

router.post('/login', loginController.login);

router.post('/logout', auth, loginController.logout);

router.get('/me', auth, userController.me);

router.post('/refresh', refreshController.refresh);

router.get('/cards',auth, cardController.load);

router.post('/cards', cardController.upload);

router.patch('/cards/:id', cardController.update);

router.get('/cards/one', cardController.loadOne);

router.post('/cards/date', cardController.getDates);

router.post('/cards/room', cardController.getRooms);






export default router;