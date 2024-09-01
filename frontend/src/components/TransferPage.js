import React, { useState, useEffect } from 'react';
import { getAllDrivers, getAllVehicles, createTransfer } from '../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const TransferPage = () => {
    const [drivers, setDrivers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [selectedDriverName, setSelectedDriverName] = useState('');
    const [selectedVehicleNumber, setSelectedVehicleNumber] = useState('');
    const [transferDate, setTransferDate] = useState('');

    useEffect(() => {
        fetchDrivers();
        fetchVehicles();
    }, []);

    const fetchDrivers = async () => {
        try {
            const data = await getAllDrivers();
            console.log("driver data",data);
            setDrivers(data);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };

    const fetchVehicles = async () => {
        try {
            const data = await getAllVehicles();
            console.log("vehicle data",data);
            setVehicles(data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    const handleTransfer = async () => {
        try {
            console.log("vehicle data in try", selectedDriverName, selectedVehicleNumber, transferDate);
            await createTransfer({
                driverName: selectedDriverName,
                vehicleNumber: selectedVehicleNumber,
                transferDate: transferDate
            });
            alert('Vehicle transferred successfully!');
            setSelectedDriverName('');
            setSelectedVehicleNumber('');
            setTransferDate('');
        } catch (error) {
            console.log("vehicle data", selectedDriverName, selectedVehicleNumber, transferDate);
            console.error('Error transferring vehicle:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Transfer Vehicle</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form className="card p-4" onSubmit={(e) => { e.preventDefault(); handleTransfer(); }}>
                        <div className="form-group mb-3">
                            <label htmlFor="driver">Select Driver:</label>
                            <select
                                id="driver"
                                className="form-control"
                                value={selectedDriverName}
                                onChange={(e) => setSelectedDriverName(e.target.value)}
                                required
                            >
                                <option value="">-- Select Driver --</option>
                                {drivers.map((driver) => (
                                    <option key={driver.name} value={driver.name}>
                                        {driver.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="vehicle">Select Vehicle:</label>
                            <select
                                id="vehicle"
                                className="form-control"
                                value={selectedVehicleNumber}
                                onChange={(e) => setSelectedVehicleNumber(e.target.value)}
                                required
                            >
                                <option value="">-- Select Vehicle --</option>
                                {vehicles.map((vehicle) => (
                                    <option key={vehicle.vehicleNumber} value={vehicle.vehicleNumber}>
                                        {vehicle.vehicleNumber} - {vehicle.vehicleType}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="date">Transfer Date:</label>
                            <input
                                type="date"
                                id="date"
                                className="form-control"
                                value={transferDate}
                                onChange={(e) => setTransferDate(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Transfer Vehicle</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TransferPage;
