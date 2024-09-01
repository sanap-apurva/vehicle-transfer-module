# Vehicle Transfer System

## Overview

The Vehicle Transfer System is a comprehensive web application designed for managing vehicle transfers. It allows users to view and manage drivers, vehicles, and transfer history, as well as to create new transfers.

## Features

- **View Drivers**: List all drivers and their details.
- **View Vehicles**: List all vehicles and their details.
- **Transfer History**: View all vehicle transfer records.
- **Create Transfers**: Manage vehicle transfers between drivers.

## Technologies Used

- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express, MongoDB
- **Routing**: React Router v6
- **File Uploads**: Multer

## Installation

### Prerequisites

- Node.js
- npm or yarn
- MongoDB (local or remote)

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/vehicle-transfer-system.git
   cd vehicle-transfer-system```

2. **Install Dependencies**

    Navigate to the backend directory and install dependencies:
    ```bash
    cd backend
    npm install
    ```
    Navigate to the frontend directory and install dependencies:
    ``` bash
    cd ../frontend
    npm install
    ```

3. **Configure Environment Variables**

    Create a `.env` file in the backend directory and add your MongoDB connection string:
    ```bash
    MONGODB_URI=your_mongodb_uri
    PORT=5000
    ```

4. **Start the application**

    Start the backend server:
    ```bash
    cd ../backend
    npm start
    ```
    Start the frontend development server:

    ```bash
    cd ../frontend
    npm start
    ```

    