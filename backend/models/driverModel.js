const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    profilePhoto: { type: String }
});

module.exports = mongoose.model('Driver', driverSchema);
