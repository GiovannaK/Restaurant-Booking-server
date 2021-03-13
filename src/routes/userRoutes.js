import {Router} from 'express';
import {show, update} from '../controllers/userController.js';
import loginRequired from '../middlewares/loginRequired.js';

const router = Router();

router.get('/profile/:userId', loginRequired, show);
router.put('/profile/', loginRequired, update);

export default router;
