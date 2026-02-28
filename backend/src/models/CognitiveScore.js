const mongoose = require('mongoose');

const cognitiveScoreSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        score: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        metrics: {
            memory: { type: Number, min: 0, max: 100 },
            attention: { type: Number, min: 0, max: 100 },
            language: { type: Number, min: 0, max: 100 },
            visuospatial: { type: Number, min: 0, max: 100 },
        },
        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('CognitiveScore', cognitiveScoreSchema);
