import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! We'll get back to you soon.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '30px', color: '#333' }}>Contact Us</h1>
      <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '40px', color: '#666' }}>
        We'd love to hear from you! Reach out to us through any of the channels below.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '50px' }}>
        
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>Our Location</h3>
          <p style={{ color: '#666', marginBottom: '5px' }}>123 Car Street</p>
          <p style={{ color: '#666', marginBottom: '5px' }}>Cityville, State, 12345</p>
          <p style={{ color: '#666' }}>North America</p>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>Email Us</h3>
          <p style={{ color: '#666', marginBottom: '5px' }}>info@bestcars.com</p>
          <p style={{ color: '#666' }}>support@bestcars.com</p>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>Call Us</h3>
          <p style={{ color: '#666', marginBottom: '5px' }}>+1 123-456-7890</p>
          <p style={{ color: '#666' }}>+1 987-654-3210</p>
        </div>

      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Send us a Message</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Your Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Enter your name" 
              value={formData.name} 
              onChange={handleChange} 
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Email address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              value={formData.email} 
              onChange={handleChange} 
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Message</label>
            <textarea 
              id="message" 
              rows="4" 
              placeholder="Write your message" 
              value={formData.message} 
              onChange={handleChange} 
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontFamily: 'Arial' }}
            ></textarea>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button 
              type="submit" 
              style={{ padding: '12px 40px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
