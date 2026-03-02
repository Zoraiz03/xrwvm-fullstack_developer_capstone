import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '30px', color: '#333' }}>About Us</h1>
      <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '40px', color: '#666' }}>
        Welcome to Best Cars dealership, home to the best cars in North America. We sell domestic and imported cars at reasonable prices and provide excellent customer service.
      </p>

      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Our Team</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '30px' }}>
        
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '30px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>Alice Johnson</h3>
          <p style={{ color: '#666', fontStyle: 'italic', marginBottom: '15px' }}>Sales Manager</p>
          <p style={{ color: '#555', marginBottom: '15px' }}>Alice leads the sales team with 10+ years of experience in the automotive industry.</p>
          <p style={{ color: '#4a90e2' }}>alice@example.com</p>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '30px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>Bob Smith</h3>
          <p style={{ color: '#666', fontStyle: 'italic', marginBottom: '15px' }}>Service Head</p>
          <p style={{ color: '#555', marginBottom: '15px' }}>Bob ensures all vehicles are serviced to the highest standards and maintains client satisfaction.</p>
          <p style={{ color: '#4a90e2' }}>bob@example.com</p>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '30px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>Carol Lee</h3>
          <p style={{ color: '#666', fontStyle: 'italic', marginBottom: '15px' }}>Finance Manager</p>
          <p style={{ color: '#555', marginBottom: '15px' }}>Carol manages all financial services and assists customers with car loans and leasing options.</p>
          <p style={{ color: '#4a90e2' }}>carol@example.com</p>
        </div>

      </div>
    </div>
  );
};

export default About;
