import React, { useState, useEffect } from 'react';
import { getAllDrivers, createDriver, updateDriver, deleteDriver } from '../api/api';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DriversPage = () => {
    const [drivers, setDrivers] = useState([]);
    const [newDriver, setNewDriver] = useState({ name: '', phoneNumber: '', profilePhoto: '' });
    const [editDriverId, setEditDriverId] = useState(null);
    const [profilePhotoFile, setProfilePhotoFile] = useState(null);

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const data = await getAllDrivers();
            setDrivers(data);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };

    const handleFileChange = (e) => {
        setProfilePhotoFile(e.target.files[0]);
    };

    const handleUploadProfilePhoto = async () => {
        if (!profilePhotoFile) {
            return ''; // No file selected, return an empty string
        }

        const formData = new FormData();
        formData.append('profilePhoto', profilePhotoFile);

        try {
            const response = await axios.post('http://localhost:5000/uploadProfilePhoto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.filePath; // Ensure this matches the response from your backend
        } catch (error) {
            console.error('Error uploading profile photo:', error);
            alert('Error uploading profile photo');
            return ''; // Return an empty string if upload fails
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Upload profile photo if a new file is selected
        const profilePhotoPath = await handleUploadProfilePhoto();

        if (editDriverId) {
            // Update existing driver
            try {
                await updateDriver(editDriverId, { ...newDriver, profilePhoto: profilePhotoPath || newDriver.profilePhoto });
                fetchDrivers();
                resetForm();
            } catch (error) {
                console.error('Error updating driver:', error);
            }
        } else {
            // Create new driver
            try {
                await createDriver({ ...newDriver, profilePhoto: profilePhotoPath });
                fetchDrivers();
                resetForm();
            } catch (error) {
                console.error('Error creating driver:', error);
            }
        }
    };

    const resetForm = () => {
        setNewDriver({ name: '', phoneNumber: '', profilePhoto: '' });
        setProfilePhotoFile(null);
        setEditDriverId(null);
    };

    const handleDeleteDriver = async (id) => {
        try {
            await deleteDriver(id);
            fetchDrivers();
        } catch (error) {
            console.error('Error deleting driver:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Drivers</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form className="card p-4" onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label>Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newDriver.name}
                                onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                                placeholder="Driver Name"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Phone Number:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newDriver.phoneNumber}
                                onChange={(e) => setNewDriver({ ...newDriver, phoneNumber: e.target.value })}
                                placeholder="Phone Number"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Profile Photo:</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={handleFileChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            {editDriverId ? 'Update Driver' : 'Add Driver'}
                        </button>
                    </form>
                </div>
            </div>

            <div className="mt-5">
                <ul className="list-group">
                    {drivers.map((driver) => (
                        <li key={driver.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                {driver.name} - {driver.phoneNumber}
                            </div>
                            <div>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => {
                                        setEditDriverId(driver.id);
                                        setNewDriver({ name: driver.name, phoneNumber: driver.phoneNumber, profilePhoto: driver.profilePhoto });
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteDriver(driver.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DriversPage;
