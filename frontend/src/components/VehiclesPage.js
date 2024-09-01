import React, { useState, useEffect } from 'react';
import { getAllVehicles, createVehicle, updateVehicle, deleteVehicle } from '../api/api';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const VehiclesPage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [newVehicle, setNewVehicle] = useState({ vehicleNumber: '', vehicleType: '', pucCertificate: '', insuranceCertificate: '' });
    const [editVehicleNumber, setEditVehicleNumber] = useState(null);
    const [pucCertificateFile, setPucCertificateFile] = useState(null);
    const [insuranceCertificateFile, setInsuranceCertificateFile] = useState(null);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const data = await getAllVehicles();
            setVehicles(data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    const handleFileChange = (e, setFile) => {
        setFile(e.target.files[0]);
    };

    const handleUploadFile = async (file, endpoint) => {
        if (!file) {
            alert(`Please select a ${endpoint} to upload.`);
            return '';
        }

        const formData = new FormData();
        formData.append(endpoint, file);

        try {
            const response = await axios.post(`http://localhost:5000/upload${endpoint}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.filePath;
        } catch (error) {
            console.error(`Error uploading ${endpoint}:`, error);
            alert(`Error uploading ${endpoint}`);
            return '';
        }
    };

    const handleCreateVehicle = async () => {
        try {
            const pucCertificatePath = await handleUploadFile(pucCertificateFile, 'PucCertificate');
            const insuranceCertificatePath = await handleUploadFile(insuranceCertificateFile, 'InsuranceCertificate');
            await createVehicle({ ...newVehicle, pucCertificate: pucCertificatePath, insuranceCertificate: insuranceCertificatePath });
            fetchVehicles();
            setNewVehicle({ vehicleNumber: '', vehicleType: '', pucCertificate: '', insuranceCertificate: '' });
            setPucCertificateFile(null);
            setInsuranceCertificateFile(null);
        } catch (error) {
            console.error('Error creating vehicle:', error);
        }
    };

    const handleUpdateVehicle = async (vehicleNumber) => {
        try {
            const pucCertificatePath = await handleUploadFile(pucCertificateFile, 'PucCertificate');
            const insuranceCertificatePath = await handleUploadFile(insuranceCertificateFile, 'InsuranceCertificate');
            await updateVehicle(vehicleNumber, { ...newVehicle, pucCertificate: pucCertificatePath, insuranceCertificate: insuranceCertificatePath });
            fetchVehicles();
            setEditVehicleNumber(null);
            setNewVehicle({ vehicleNumber: '', vehicleType: '', pucCertificate: '', insuranceCertificate: '' });
            setPucCertificateFile(null);
            setInsuranceCertificateFile(null);
        } catch (error) {
            console.error('Error updating vehicle:', error);
        }
    };

    const handleDeleteVehicle = async (vehicleNumber) => {
        try {
            await deleteVehicle(vehicleNumber);
            fetchVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Vehicles</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form
                        className="card p-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (editVehicleNumber) {
                                handleUpdateVehicle(editVehicleNumber);
                            } else {
                                handleCreateVehicle();
                            }
                        }}
                    >
                        <div className="form-group mb-3">
                            <label htmlFor="vehicleNumber">Vehicle Number:</label>
                            <input
                                type="text"
                                id="vehicleNumber"
                                className="form-control"
                                value={newVehicle.vehicleNumber}
                                onChange={(e) => setNewVehicle({ ...newVehicle, vehicleNumber: e.target.value })}
                                placeholder="Vehicle Number"
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="vehicleType">Vehicle Type:</label>
                            <input
                                type="text"
                                id="vehicleType"
                                className="form-control"
                                value={newVehicle.vehicleType}
                                onChange={(e) => setNewVehicle({ ...newVehicle, vehicleType: e.target.value })}
                                placeholder="Vehicle Type"
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="pucCertificate">PUC Certificate:</label>
                            <input
                                type="file"
                                id="pucCertificate"
                                className="form-control"
                                onChange={(e) => handleFileChange(e, setPucCertificateFile)}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="insuranceCertificate">Insurance Certificate:</label>
                            <input
                                type="file"
                                id="insuranceCertificate"
                                className="form-control"
                                onChange={(e) => handleFileChange(e, setInsuranceCertificateFile)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            {editVehicleNumber ? 'Update Vehicle' : 'Add Vehicle'}
                        </button>
                    </form>
                </div>
            </div>

            <ul className="list-group mt-4">
                {vehicles.map((vehicle) => (
                    <li key={vehicle.vehicleNumber} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{vehicle.vehicleNumber} - {vehicle.vehicleType}</span>
                        <div>
                            <button
                                className="btn btn-sm btn-secondary me-2"
                                onClick={() => {
                                    setEditVehicleNumber(vehicle.vehicleNumber);
                                    setNewVehicle({ vehicleNumber: vehicle.vehicleNumber, vehicleType: vehicle.vehicleType, pucCertificate: vehicle.pucCertificate, insuranceCertificate: vehicle.insuranceCertificate });
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteVehicle(vehicle.vehicleNumber)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VehiclesPage;
