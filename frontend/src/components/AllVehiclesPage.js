import React, { useState, useEffect } from 'react';
import { getAllVehicles } from '../api/api';

const AllVehiclesPage = () => {
    const [vehicles, setVehicles] = useState([]);

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

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">All Vehicles</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Vehicle Number</th>
                        <th>Vehicle Type</th>
                        <th>PUC Certificate</th>
                        <th>Insurance Certificate</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map((vehicle) => (
                        <tr key={vehicle.vehicleNumber}>
                            <td>{vehicle.vehicleNumber}</td>
                            <td>{vehicle.vehicleType}</td>
                            <td><a href={vehicle.pucCertificate} target="_blank" rel="noopener noreferrer">View</a></td>
                            <td><a href={vehicle.insuranceCertificate} target="_blank" rel="noopener noreferrer">View</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllVehiclesPage;
