import express from 'express';
const router = express.Router();
import registerController from '../controllers/auth/registerController.js';
import loginController from '../controllers/auth/loginController.js';
import auth from '../middleware/auth.js';
import userController from '../controllers/auth/userController.js';
import refreshController from '../controllers/auth/refreshController.js';

router.post('/register', registerController.register);

router.post('/login', loginController.login);

router.post('/logout', auth, loginController.logout);

router.get('/me', auth, userController.me);

router.post('/refresh', refreshController.refresh);




// router.post('/refresh', refreshController.refresh);
// router.get('/me', auth, userController.me);


export default router;