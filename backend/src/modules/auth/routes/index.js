const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

/**
 * POST /send-otp
 * Sends an OTP code to the provided phone number
 * Body: { phoneNumber: string (E.164 format) }
 */
router.post('/send-otp', AuthController.sendOTP);

/**
 * POST /verify-otp
 * Verifies the OTP code and authenticates the user
 * Body: { phoneNumber: string, code: string (6 digits) }
 */
router.post('/verify-otp', AuthController.verifyOTP);

module.exports = router;
