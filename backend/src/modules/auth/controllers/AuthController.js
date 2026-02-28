const TwilioVerifyService = require('../services/TwilioVerifyService');
const jwt = require('jsonwebtoken');

class AuthController {
  /**
   * Send OTP to the user's phone number
   * @param {Object} req - Express request object
   * @param {string} req.body.phoneNumber - Phone number in E.164 format
   * @param {Object} res - Express response object
   */
  static async sendOTP(req, res) {
    try {
      const { phoneNumber } = req.body;

      // Validate phone number
      if (!phoneNumber || typeof phoneNumber !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Missing or invalid phoneNumber in request body',
        });
      }

      // Validate E.164 format
      if (!/^\+\d{1,15}$/.test(phoneNumber)) {
        return res.status(400).json({
          success: false,
          message: 'Phone number must be in E.164 format (e.g., +1234567890)',
        });
      }

      // Send OTP via Twilio Verify
      const result = await TwilioVerifyService.sendOTP(phoneNumber);

      return res.status(200).json({
        success: true,
        data: result,
        message: `OTP sent to ${phoneNumber}`,
      });
    } catch (error) {
      console.error('Error in sendOTP:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to send OTP',
      });
    }
  }

  /**
   * Verify OTP and authenticate user
   * @param {Object} req - Express request object
   * @param {string} req.body.phoneNumber - Phone number
   * @param {string} req.body.code - 6-digit OTP code
   * @param {Object} res - Express response object
   */
  static async verifyOTP(req, res) {
    try {
      const { phoneNumber, code } = req.body;

      // Validate inputs
      if (!phoneNumber || !code) {
        return res.status(400).json({
          success: false,
          message: 'Missing phoneNumber or code in request body',
        });
      }

      if (!/^\d{6}$/.test(code)) {
        return res.status(400).json({
          success: false,
          message: 'Code must be a 6-digit number',
        });
      }

      // Verify OTP
      const verificationResult = await TwilioVerifyService.verifyOTP(phoneNumber, code);

      if (!verificationResult.success) {
        return res.status(401).json({
          success: false,
          message: verificationResult.message,
        });
      }

      // Generate JWT token
      const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
      const token = jwt.sign(
        {
          phoneNumber: phoneNumber,
          role: 'elderly',
          id: phoneNumber.replace(/\D/g, ''), // Use phone number digits as ID for now
        },
        jwtSecret,
        { expiresIn: '7d' }
      );

      // Return success with token and user info
      return res.status(200).json({
        success: true,
        data: {
          token,
          user: {
            phoneNumber,
            role: 'elderly',
            name: 'Elderly User', // Can be fetched from DB in production
          },
        },
        message: 'Authentication successful',
      });
    } catch (error) {
      console.error('Error in verifyOTP:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to verify OTP',
      });
    }
  }
}

module.exports = AuthController;
