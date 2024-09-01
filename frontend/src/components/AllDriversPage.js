import React, { useState, useEffect } from 'react';
import { getAllDrivers } from '../api/api';

const AllDriversPage = () => {
    const [drivers, setDrivers] = useState([]);

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

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">All Drivers</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Profile Photo</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map((driver) => (
                        <tr key={driver._id}>
                            <td>{driver.name}</td>
                            <td>{driver.phoneNumber}</td>
                            <td><img src={driver.profilePhoto} alt={driver.name} style={{ width: '100px', height: 'auto' }} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllDriversPage;
