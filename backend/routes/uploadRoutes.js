const express = require('express');
const router = express.Router();
const upload = require('../uploads/uploadconfig'); // Adjust path as needed

// Route to handle profile photo upload
router.post('/uploadProfilePhoto', upload.single('profilePhoto'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Find the driver by ID and update the profile photo
        const driver = await driver.findByIdAndUpdate(
            req.params.id,
            { profilePhoto: req.file.path },
            { new: true } // Return the updated document
        );
        if (!driver) {
            return res.status(404).send('Driver not found.');
        }

        res.send({ filePath: req.file.path, driver });
    } catch (error) {
        console.error('Error uploading profile photo:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/uploadPucCertificate', upload.single('pucCertificate'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Find the driver by ID and update the profile photo
        const vehicle = await vehicle.findByIdAndUpdate(
            req.params.id,
            { pucCertificate: req.file.path },
            { new: true } // Return the updated document
        );
        if (!vehicle) {
            return res.status(404).send('vehicle not found.');
        }

        res.send({ filePath: req.file.path, vehicle });
    } catch (error) {
        console.error('Error uploading puc certificate:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to handle insurance certificate upload
router.post('/uploadInsuranceCertificate', upload.single('insuranceCertificate'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Find the vehicle by ID and update the profile photo
        const vehicle = await vehicle.findByIdAndUpdate(
            req.params.id,
            {insuranceCertificate : req.file.path },
            { new: true } // Return the updated document
        );
        if (!vehicle) {
            return res.status(404).send('vehicle not found.');
        }

        res.send({ filePath: req.file.path, driver });
    } catch (error) {
        console.error('Error uploading profile photo:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/uploadInsuranceCertificate', upload.single('insuranceCertificate'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({ message: 'Insurance certificate uploaded successfully', file: req.file });
});

module.exports = router;
