import { Router } from 'express';

const router = Router();

router.post('/register');
router.post('/login');
router.post('/account_confirmation');
router.post('/account_confirmation_resend');
router.post('/forgot_password');
router.put('/reset_password');

