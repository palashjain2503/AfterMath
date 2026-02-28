const express = require('express');
const AlertController = require('../controllers/AlertController');

const router = express.Router();

/**
 * POST /sos
 * Triggers an emergency SOS call
 * Body: { elderlyName: string }
 */
router.post('/sos', AlertController.triggerSOS);

module.exports = router;
