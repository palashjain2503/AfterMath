const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['elderly', 'caregiver', 'doctor'],
            default: 'elderly',
        },
        age: {
            type: Number,
        },
        avatar: {
            type: String,
        },
        emergencyContacts: [
            {
                name: String,
                phone: String,
                relation: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
