import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const createDriver = async (driver) => {
    try {
        const response = await axios.post(`${API_URL}/drivers`, driver);
        return response.data;
    } catch (error) {
        console.error('Error creating driver:', error);
        throw error;
    }
};

export const getAllDrivers = async () => {
    try {
        const response = await axios.get(`${API_URL}/drivers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching drivers:', error);
        throw error;
    }
};

export const getDriverById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/drivers/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching driver by ID:', error);
        throw error;
    }
};

export const getDriverByName = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/drivers/search`, { params: { name } });
        return response.data;
    } catch (error) {
        console.error('Error fetching driver by name:', error);
        throw error;
    }
};

export const updateDriver = async (id, driver) => {
    try {
        const response = await axios.put(`${API_URL}/drivers/${id}`, driver);
        return response.data;
    } catch (error) {
        console.error('Error updating driver:', error);
        throw error;
    }
};

export const deleteDriver = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/drivers/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting driver:', error);
        throw error;
    }
};

export const createVehicle = async (vehicle) => {
    try {
        const response = await axios.post(`${API_URL}/vehicles`, vehicle);
        return response.data;
    } catch (error) {
        console.error('Error creating vehicle:', error);
        throw error;
    }
};

export const getAllVehicles = async () => {
    try {
        const response = await axios.get(`${API_URL}/vehicles`);
        return response.data;
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
};

export const getVehicleByNumber = async (vehicleNumber) => {
    try {
        const response = await axios.get(`${API_URL}/vehicles/${vehicleNumber}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching vehicle by number:', error);
        throw error;
    }
};

export const getVehicleByType = async (type) => {
    try {
        const response = await axios.get(`${API_URL}/vehicles/search`, { params: { vehicleType: type } });
        return response.data;
    } catch (error) {
        console.error('Error fetching vehicle by type:', error);
        throw error;
    }
};

export const updateVehicle = async (vehicleNumber, vehicle) => {
    try {
        const response = await axios.put(`${API_URL}/vehicles/${vehicleNumber}`, vehicle);
        return response.data;
    } catch (error) {
        console.error('Error updating vehicle:', error);
        throw error;
    }
};

export const deleteVehicle = async (vehicleNumber) => {
    try {
        const response = await axios.delete(`${API_URL}/vehicles/${vehicleNumber}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        throw error;
    }
};

// Ensure the route matches
export const createTransfer = async (transferData) => {
    try {
        console.log("transfer data", transferData);
        const response = await axios.post(`${API_URL}/transfers`, transferData);
        console.log("response data=====", response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating transfer:', error.response ? error.response.data : error.message);
        throw error;
    }
};


export const getAllTransfers = async () => {
    try {
        const response = await axios.get(`${API_URL}/transfers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching transfers:', error.response ? error.response.data : error.message);
        throw error;
    }
};
