import { Router } from 'express';
import { register, accountConfirmation } from '../controllers/sessionController.js';

const router = Router();

router.post('/register', register);
router.post('/account_confirmation/:confirmationToken', accountConfirmation);
router.post('/account_confirmation_resend');
router.post('/login');
router.post('/forgot_password');
router.put('/reset_password');

export default router;
