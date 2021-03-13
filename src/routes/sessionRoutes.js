import { Router } from 'express';
import {
  register,
  accountConfirmation,
  accountConfirmationResend,
  login,
  forgotPassword
} from '../controllers/sessionController.js';

const router = Router();

router.post('/register', register);
router.post('/account_confirmation/:confirmationToken', accountConfirmation);
router.post('/account_confirmation_resend', accountConfirmationResend);
router.post('/login', login);
router.post('/forgot_password', forgotPassword);
router.put('/reset_password');

export default router;
