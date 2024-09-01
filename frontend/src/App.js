import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DriversPage from './components/DriversPage';
import VehiclesPage from './components/VehiclesPage';
import TransferPage from './components/TransferPage';
import AllDriversPage from './components/AllDriversPage';
import AllVehiclesPage from './components/AllVehiclesPage';
import TransferHistoryPage from './components/TransferHistory';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="container text-center mt-5">
        <h1 className="display-3 mb-4">Welcome to the Vehicle Transfer System</h1>
        <p className="lead mb-4">
            Manage and track your vehicle transfers with ease. Our system provides a comprehensive platform for managing drivers, vehicles, and their transfers.
        </p>
        <p className="mb-4">
            Explore our features to view all drivers, vehicles, and transfer history. Effortlessly update vehicle information and perform transfers with just a few clicks.
        </p>
        <p>
            <a href="/Alldrivers" className="btn btn-primary btn-lg ">View Drivers</a>&nbsp;&nbsp;
            <a href="/Allvehicles" className="btn btn-success btn-lg">View Vehicles</a>&nbsp;&nbsp;
            <a href="/transfer-history" className="btn btn-info btn-lg">View Transfers</a>&nbsp;&nbsp;
        </p>
    </div>
);
};

function App() {
    return (
        <Router>
            <div>
                <header>
                    <h1>Vehicle Transfer System Design</h1>
                    <nav>
                        <ul>
                          <li><Link to="/">Go to Home</Link></li>
                            <li><Link to="/drivers">Drivers</Link></li>
                            {/* <li><Link to="/Alldrivers">Drivers List</Link></li> */}
                            <li><Link to="/vehicles">Vehicles</Link></li>
                            {/* <li><Link to="/Allvehicles">Vehicles List</Link></li> */}
                            <li><Link to="/transferVehicle">Transfer Vehicle</Link></li>
                            {/* <li><Link to="/transfer-history">Transfer History</Link></li> */}
                        </ul>
                    </nav>
                </header>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/drivers" element={<DriversPage />} />
                    <Route path="/vehicles" element={<VehiclesPage />} />
                    <Route path="/Alldrivers" element={<AllDriversPage />} />
                    <Route path="/Allvehicles" element={<AllVehiclesPage />} />
                    <Route path="/transferVehicle" element={<TransferPage />} />
                    <Route path="/transfer-history" element={<TransferHistoryPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
