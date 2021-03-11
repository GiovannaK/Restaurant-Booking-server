import { Router } from 'express';
import { register } from '../controllers/sessionController.js';

const router = Router();

router.post('/register', register);
router.post('/login');
router.post('/account_confirmation/:token');
router.post('/account_confirmation_resend');
router.post('/forgot_password');
router.put('/reset_password');

export default router;
