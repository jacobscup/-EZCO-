import React, { useState } from 'react'
import '../styles/PropertyDetail.css'

function PropertyDetail({ propertyId, onBack, userAddress }) {
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [buyAmount, setBuyAmount] = useState('')

  // Mock property data
  const property = {
    id: propertyId,
    title: 'Luxury Apartment in Lekki',
    description: 'Beautiful 3-bedroom apartment with modern amenities in the heart of Lekki Phase 1. This property includes a stunning living room, fully equipped kitchen, 3 spacious bedrooms with en-suite bathrooms, and a large balcony overlooking the city.',
    location: 'Lekki, Lagos, Nigeria',
    price: 250000,
    owner: '0x742d35Cc6634C0532925a3b844Bc0e7595f7a0F8',
    verified: true,
    status: 'Listed',
    bedrooms: 3,
    bathrooms: 2,
    area: '850 sqm',
    yearBuilt: '2022',
    amenities: ['Swimming Pool', 'Gym', 'Security', 'Parking', 'Garden', 'Balcony'],
    images: [],
    description_full: 'This is a premium property located in the prestigious Lekki area. Built with quality materials and modern architecture, it represents a sound investment opportunity.'
  }

  const handleBuyClick = () => {
    setShowBuyModal(true)
  }

  const handleSubmitOffer = () => {
    if (!buyAmount) {
      alert('Please enter an amount')
      return
    }
    alert(`Offer of $${buyAmount} submitted for property #${propertyId}`)
    setShowBuyModal(false)
    setBuyAmount('')
  }

  return (
    <div className="property-detail-container">
      <button className="btn-back" onClick={onBack}>
        ← Back to Marketplace
      </button>

      <div className="detail-content">
        <div className="property-image-section">
          <div className="large-image-placeholder">
            <span className="large-building-emoji">🏢</span>
            <p>Property Image</p>
          </div>
        </div>

        <div className="property-info-section">
          <div className="info-header">
            <h1>{property.title}</h1>
            {property.verified && (
              <div className="verified-badge-large">✓ Verified Property</div>
            )}
          </div>

          <div className="location-info">
            <p className="location">📍 {property.location}</p>
            <p className="year-built">Built: {property.yearBuilt}</p>
          </div>

          <div className="price-section-large">
            <p className="price-label">Listed Price</p>
            <p className="price-large">${property.price.toLocaleString()}</p>
          </div>

          <div className="specs-grid">
            <div className="spec">
              <span className="spec-icon">🛏️</span>
              <p><strong>{property.bedrooms}</strong> Bedrooms</p>
            </div>
            <div className="spec">
              <span className="spec-icon">🚿</span>
              <p><strong>{property.bathrooms}</strong> Bathrooms</p>
            </div>
            <div className="spec">
              <span className="spec-icon">📐</span>
              <p><strong>{property.area}</strong></p>
            </div>
          </div>

          <div className="description-section">
            <h3>Description</h3>
            <p>{property.description_full}</p>
          </div>

          <div className="amenities-section">
            <h3>Amenities</h3>
            <div className="amenities-list">
              {property.amenities.map((amenity, index) => (
                <span key={index} className="amenity-tag">✓ {amenity}</span>
              ))}
            </div>
          </div>

          <div className="owner-section-detail">
            <h3>Property Owner</h3>
            <div className="owner-card">
              <div className="owner-avatar">👤</div>
              <div className="owner-info">
                <p className="owner-address">
                  {property.owner.slice(0, 6)}...{property.owner.slice(-4)}
                </p>
                <p className="owner-label">Verified Seller</p>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn-primary" onClick={handleBuyClick}>
              🛒 Make Offer
            </button>
            <button className="btn-secondary">
              ❓ Ask Question
            </button>
          </div>
        </div>
      </div>

      {showBuyModal && (
        <div className="modal-overlay" onClick={() => setShowBuyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Make an Offer</h2>
              <button 
                className="btn-close"
                onClick={() => setShowBuyModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="offer-info">
                <p className="property-name">{property.title}</p>
                <p className="asking-price">Asking Price: <strong>${property.price.toLocaleString()}</strong></p>
              </div>

              <div className="form-group">
                <label>Your Offer Amount (USD):</label>
                <input
                  type="number"
                  placeholder="Enter your offer amount"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Payment Method:</label>
                <select className="input-field">
                  <option>USDC (Ethereum)</option>
                  <option>USDT (Ethereum)</option>
                  <option>DAI (Ethereum)</option>
                </select>
              </div>

              <div className="modal-footer">
                <button 
                  className="btn-cancel"
                  onClick={() => setShowBuyModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-submit"
                  onClick={handleSubmitOffer}
                >
                  Submit Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PropertyDetail
