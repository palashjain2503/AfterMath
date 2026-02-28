const mongoose = require('mongoose');

const gameStatsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        gameId: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        levelReached: Number,
        timePlayedSeconds: Number,
        accuracy: {
            type: Number,
            min: 0,
            max: 100,
        },
        datePlayed: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('GameStats', gameStatsSchema);
