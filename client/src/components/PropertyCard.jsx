import React from 'react'
import '../styles/PropertyCard.css'
import { formatAddress } from '../contract'

function PropertyCard({ property, onSelect }) {
  const handleClick = () => {
    onSelect(property.id)
  }

  return (
    <div className="property-card" onClick={handleClick}>
      <div className="property-image">
        <div className="image-placeholder">
          <span className="building-emoji">🏢</span>
        </div>
        {property.verified && (
          <div className="verified-badge">
            ✓ Verified
          </div>
        )}
        <div className="status-badge">{property.status}</div>
      </div>

      <div className="property-info">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-location">📍 {property.location}</p>
        
        <div className="property-details">
          <p className="property-description">
            {property.description.substring(0, 80)}...
          </p>
        </div>

        <div className="property-footer">
          <div className="price-section">
            <span className="label">Price</span>
            <p className="price">${property.price.toLocaleString()}</p>
          </div>
          <div className="owner-section">
            <span className="label">Owner</span>
            <p className="owner">
              {formatAddress(property.owner)}
            </p>
          </div>
        </div>

        <button className="btn-view" onClick={handleClick}>
          View Details →
        </button>
      </div>
    </div>
  )
}

export default PropertyCard
