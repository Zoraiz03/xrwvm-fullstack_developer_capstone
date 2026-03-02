import React, { useState, useEffect } from 'react';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/djangoapp/get_cars');
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        setCars(data.CarModels || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError(err.message);
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '20px', color: '#333' }}>Our Vehicles</h1>
      <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '40px', color: '#666' }}>
        Browse our selection of high-quality vehicles from top manufacturers.
      </p>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.2rem', color: '#666' }}>
          Loading vehicles...
        </div>
      )}
      
      {error && (
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.2rem', color: 'red' }}>
          Error: {error}
        </div>
      )}
      
      {!loading && !error && cars.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {cars.map((car, index) => (
            <div key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '20px' }}>
              <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '4px', marginBottom: '15px' }}>
                <h3 style={{ margin: '0', color: '#333', fontSize: '1.5rem' }}>{car.CarMake}</h3>
              </div>
              <div>
                <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                  <strong>Model:</strong> {car.CarModel}
                </p>
                <button 
                  style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={() => alert(`You selected ${car.CarMake} ${car.CarModel}`)}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.2rem', color: '#666' }}>No vehicles available.</div>
      )}
    </div>
  );
};

export default Cars;
