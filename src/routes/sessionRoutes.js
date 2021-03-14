const express = require('express');
const {
  register,
  accountConfirmation,
  accountConfirmationResend,
  login,
  forgotPassword,
  resetPassword
} = require('../controllers/sessionController');

const router = express.Router();

router.post('/register', register);
router.post('/account_confirmation/:confirmationToken', accountConfirmation);
router.post('/account_confirmation_resend', accountConfirmationResend);
router.post('/login', login);
router.post('/forgot_password', forgotPassword);
router.put('/reset_password/:resetToken', resetPassword);

module.exports = router;
