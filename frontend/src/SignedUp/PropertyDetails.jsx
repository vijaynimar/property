import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://property-gcvo.onrender.com/propertyget")
      .then(response => response.json())
      .then(data => {
        const foundProperty = Array.isArray(data) ? data.find(prop => prop._id === id) : null;
        setProperty(foundProperty);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching properties:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading property details...</p>;
  if (!property) return <p>Property not found.</p>;

  return (
    <div className="property-container">
      <div className="property-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>← Back to Listings</button>
      </div>
      <div className="property-main-content">
        <div className="property-image-section">
          <img src={property.imageUrls?.[0] || "https://via.placeholder.com/600"} alt={property.title} className="property-main-image" />
          <div className="property-price-tag">${property.price.toLocaleString()}</div>
        </div>
        <div className="property-details-section">
          <h1 className="property-title">{property.title}</h1>
          <p className="property-location">{property.city}</p>
          <div className="property-stats-grid">
            <div className="property-stat-card"><div className="property-stat-value">{property.bhk}</div><div className="property-stat-label">BHK</div></div>
            <div className="property-stat-card"><div className="property-stat-value">{property.length * property.breadth}</div><div className="property-stat-label">Square Feet</div></div>
            <div className="property-stat-card"><div className="property-stat-value">{new Date(property.established).getFullYear()}</div><div className="property-stat-label">Year Built</div></div>
            <div className="property-stat-card"><div className="property-stat-value">{property.rating}</div><div className="property-stat-label">Rating</div></div>
          </div>
          <p className="property-description">{property.description}</p>
          <button className="contact-button">Contact Seller: {property.phone}</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;