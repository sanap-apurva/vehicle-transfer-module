const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const driverRoutes = require('./routes/driverRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const transferRoutes = require('./routes/transferRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/vehicle-transfer-system');

// Routes
app.use('/drivers', driverRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/transfers', transferRoutes);
app.use('/upload', uploadRoutes)

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
