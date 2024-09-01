const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleNumber: { type: String, required: true, unique: true },
    vehicleType: { type: String, required: true },
    pucCertificate: { type: String },
    insuranceCertificate: { type: String }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
