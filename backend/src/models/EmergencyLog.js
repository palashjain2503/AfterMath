const mongoose = require('mongoose');

const emergencyLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        alertType: {
            type: String,
            enum: ['panic_button', 'fall_detected', 'inactivity', 'distress_phrase', 'other'],
            required: true,
        },
        status: {
            type: String,
            enum: ['triggered', 'acknowledged', 'resolved', 'false_alarm'],
            default: 'triggered',
        },
        location: {
            latitude: Number,
            longitude: Number,
            address: String,
        },
        resolvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        resolutionNotes: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('EmergencyLog', emergencyLogSchema);
