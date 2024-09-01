const express = require('express');
const router = express.Router();
const Transfer = require('../models/transferModel');

// Create a transfer
router.post('/', async (req, res) => {
    console.log("req body", req.body);
    const { driverName, vehicleNumber, transferDate } = req.body;

    // Check that driverName is being received
    console.log('Driver Name:', driverName);

    const transfer = new Transfer({
        driverName,  // Save driverName instead of driverId
        vehicleNumber,
        transferDate
    });

    try {
        const newTransfer = await transfer.save();
        res.status(201).json(newTransfer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all transfers
router.get('/', async (req, res) => {
    try {
        const transfers = await Transfer.find(); // Fetch all transfers from the database
        res.status(200).json(transfers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
