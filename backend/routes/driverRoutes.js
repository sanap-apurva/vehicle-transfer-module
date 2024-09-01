const express = require('express');
const router = express.Router();
const Driver = require('../models/driverModel');

// Get all drivers
router.get('/', async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a driver
router.post('/', async (req, res) => {
    const driver = new Driver({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        profilePhoto: req.body.profilePhoto
    });

    try {
        const newDriver = await driver.save();
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a driver
router.put('/:id', async (req, res) => {
    try {
        const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(driver);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a driver
router.delete('/:id', async (req, res) => {
    try {
        await Driver.findByIdAndDelete(req.params.id);
        res.json({ message: 'Driver deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
