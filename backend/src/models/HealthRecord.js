const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
            required: true,
        },
        bloodPressure: {
            systolic: Number,
            diastolic: Number,
        },
        heartRate: Number,
        sleepHours: Number,
        activityLevel: {
            type: String,
            enum: ['sedentary', 'light', 'moderate', 'active'],
        },
        moodScore: {
            type: Number,
            min: 0,
            max: 10,
        },
        notes: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
