import React, { useState, useEffect } from 'react';
import { getAllTransfers } from '../api/api'; // Make sure this function is implemented in your api.js
import 'bootstrap/dist/css/bootstrap.min.css';

const TransferHistoryPage = () => {
    const [transfers, setTransfers] = useState([]);

    useEffect(() => {
        fetchTransfers();
    }, []);

    const fetchTransfers = async () => {
        try {
            const data = await getAllTransfers();
            console.log("transfer data", data);
            setTransfers(data);
        } catch (error) {
            console.error('Error fetching transfers:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Transfer History</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Driver Name</th>
                        <th>Vehicle Number</th>
                        <th>Transfer Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transfers.map((transfer) => (
                        <tr key={transfer._id}>
                            <td>{transfer.driverName}</td>
                            <td>{transfer.vehicleNumber}</td>
                            <td>{new Date(transfer.transferDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransferHistoryPage;
