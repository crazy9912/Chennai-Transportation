import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/buses')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch bus data');
        }
        return res.json();
      })
      .then(data => {
        setBuses(data);
        setFilteredBuses(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = buses.filter(bus =>
      bus.route.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBuses(filtered);
  }, [searchTerm, buses]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Chennai Smart Transportation</h1>
          <nav>
            <a href="#home" className="mr-4 hover:underline">Home</a>
            <a href="#routes" className="mr-4 hover:underline">Routes</a>
            <a href="#about" className="hover:underline">About</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Welcome to CTC Smart System</h2>
            <p className="text-lg">Real-time bus tracking and route planning for Chennai commuters.</p>
          </div>
        </div>
      </section>

      {/* Bus Routes Section */}
      <section id="routes" className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Bus Routes & Schedules</h2>
        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search by route (e.g., Anna Nagar - Central)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        {loading ? (
          <div className="text-center">
            <p className="text-lg text-gray-600">Loading bus data...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-lg text-red-600">Error: {error}</p>
          </div>
        ) : filteredBuses.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-600">No bus data available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBuses.map(bus => (
              <div key={bus.busId} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" alt={bus.route} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{bus.route}</h3>
                  <p className="text-gray-600">Bus ID: {bus.busId}</p>
                  <p className="text-gray-600">Time: {bus.schedule}</p>
                  <p className="text-gray-600">
                    Status: <span className={bus.status === "Running" ? "text-green-600 font-bold" : "text-orange-600 font-bold"}>{bus.status}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>© 2025 Chennai Transport Corporation. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;