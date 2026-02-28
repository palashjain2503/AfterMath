const TwilioSOSService = require('../services/TwilioSOSService');

class AlertController {
  /**
   * Triggers an SOS emergency call for an elderly person
   * @param {Object} req - Express request object
   * @param {string} req.body.elderlyName - Name of the elderly person
   * @param {Object} res - Express response object
   */
  static async triggerSOS(req, res) {
    try {
      const { elderlyName } = req.body;

      // Validate required field
      if (!elderlyName || typeof elderlyName !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Missing or invalid elderlyName in request body',
        });
      }

      // Call the Twilio service to initiate emergency call
      const result = await TwilioSOSService.triggerEmergencyCall(elderlyName);

      return res.status(200).json({
        success: true,
        data: result,
        message: `Emergency call triggered for ${elderlyName}`,
      });
    } catch (error) {
      console.error('Error in triggerSOS:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to trigger emergency call',
      });
    }
  }
}

module.exports = AlertController;
