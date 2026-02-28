const twilio = require('twilio');

class TwilioSOSService {
  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) {
      throw new Error('Missing Twilio credentials: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN');
    }

    this.twilioClient = twilio(accountSid, authToken);
    this.fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
    this.toPhoneNumber = process.env.CAREGIVER_PHONE_NUMBER;

    if (!this.fromPhoneNumber || !this.toPhoneNumber) {
      throw new Error('Missing phone numbers: TWILIO_PHONE_NUMBER or CAREGIVER_PHONE_NUMBER');
    }
  }

  /**
   * Triggers an emergency voice call to the caregiver
   * @param {string} elderlyName - Name of the elderly person requesting SOS
   * @returns {Promise<Object>} Call object from Twilio API
   * @throws {Error} If the call fails to initiate
   */
  async triggerEmergencyCall(elderlyName) {
    try {
      const twiml = `<Response><Say voice="alice">Emergency alert. MindBridge has detected an SOS request from ${elderlyName}. Please check on them immediately.</Say></Response>`;

      const call = await this.twilioClient.calls.create({
        to: this.toPhoneNumber,
        from: this.fromPhoneNumber,
        twiml: twiml,
      });

      console.log(`Emergency call initiated for ${elderlyName}. Call SID: ${call.sid}`);

      return {
        success: true,
        callSid: call.sid,
        message: `Emergency call triggered for ${elderlyName}`,
      };
    } catch (error) {
      console.error('Error triggering emergency call:', error.message);
      throw new Error(`Failed to trigger emergency call: ${error.message}`);
    }
  }
}

module.exports = new TwilioSOSService();
