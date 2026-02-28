const twilio = require('twilio');

class TwilioVerifyService {
  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;

    if (!accountSid || !authToken || !verifySid) {
      throw new Error('Missing Twilio credentials: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, or TWILIO_VERIFY_SERVICE_SID');
    }

    this.twilioClient = twilio(accountSid, authToken);
    this.verifySid = verifySid;
  }

  /**
   * Send OTP code to the provided phone number
   * @param {string} phoneNumber - Phone number in E.164 format (e.g., +1234567890)
   * @returns {Promise<Object>} Verification object with sid
   * @throws {Error} If OTP sending fails
   */
  async sendOTP(phoneNumber) {
    try {
      const verification = await this.twilioClient.verify.v2
        .services(this.verifySid)
        .verifications.create({
          to: phoneNumber,
          channel: 'sms',
        });

      console.log(`OTP sent to ${phoneNumber}. SID: ${verification.sid}`);

      return {
        success: true,
        sid: verification.sid,
        status: verification.status,
        message: `OTP sent to ${phoneNumber}`,
      };
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      throw new Error(`Failed to send OTP: ${error.message}`);
    }
  }

  /**
   * Verify the OTP code provided by the user
   * @param {string} phoneNumber - Phone number in E.164 format
   * @param {string} code - 6-digit OTP code
   * @returns {Promise<Object>} Verification status (approved/denied)
   * @throws {Error} If verification fails
   */
  async verifyOTP(phoneNumber, code) {
    try {
      const verificationCheck = await this.twilioClient.verify.v2
        .services(this.verifySid)
        .verificationChecks.create({
          to: phoneNumber,
          code: code,
        });

      console.log(`Verification status for ${phoneNumber}: ${verificationCheck.status}`);

      return {
        success: verificationCheck.status === 'approved',
        status: verificationCheck.status,
        message: verificationCheck.status === 'approved' 
          ? 'OTP verified successfully' 
          : 'Invalid or expired OTP',
      };
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      throw new Error(`Failed to verify OTP: ${error.message}`);
    }
  }
}

module.exports = new TwilioVerifyService();
