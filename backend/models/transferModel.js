const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
    driverName: { type: String, ref: 'Driver', required: true },
    vehicleNumber: { type: String, ref: 'Vehicle', required: true },
    transferDate: { type: Date, required: true }
});

module.exports = mongoose.model('Transfer', transferSchema);
