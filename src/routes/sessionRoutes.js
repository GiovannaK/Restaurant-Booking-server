const express = require('express');
const {
  register,
  accountConfirmation,
  accountConfirmationResend,
  login,
  forgotPassword,
  resetPassword,
  registerPartner,
  registerAdmin,
} = require('../controllers/sessionController');

const router = express.Router();

router.post('/register', register);
router.post('/register_partners', registerPartner);
router.post('/402831da5d20f75fb40ca0f6371697ab1d635e3c_admin', registerAdmin);
router.post('/account_confirmation/:confirmationToken', accountConfirmation);
router.post('/account_confirmation_resend', accountConfirmationResend);
router.post('/login', login);
router.post('/forgot_password', forgotPassword);
router.put('/reset_password/:resetToken', resetPassword);

module.exports = router;
