const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicleModel');

// Get all vehicles
router.get('/', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a vehicle
router.post('/', async (req, res) => {
    const vehicle = new Vehicle({
        vehicleNumber: req.body.vehicleNumber,
        vehicleType: req.body.vehicleType,
        pucCertificate: req.body.pucCertificate,
        insuranceCertificate: req.body.insuranceCertificate
    });

    try {
        const newVehicle = await vehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a vehicle
router.put('/:vehicleNumber', async (req, res) => {
    try {
        const vehicle = await Vehicle.findOneAndUpdate({ vehicleNumber: req.params.vehicleNumber }, req.body, { new: true });
        res.json(vehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a vehicle
router.delete('/:vehicleNumber', async (req, res) => {
    try {
        await Vehicle.findOneAndDelete({ vehicleNumber: req.params.vehicleNumber });
        res.json({ message: 'Vehicle deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
