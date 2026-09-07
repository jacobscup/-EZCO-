import React, { useState } from 'react'
import PropertyCard from '../components/PropertyCard'
import '../styles/PropertyMarketplace.css'

function PropertyMarketplace({ onPropertySelect, userAddress }) {
  // Mock data for properties
  const [properties] = useState([
    {
      id: 1,
      title: 'Luxury Apartment in Lekki',
      description: 'Beautiful 3-bedroom apartment with modern amenities in the heart of Lekki Phase 1',
      location: 'Lekki, Lagos, Nigeria',
      price: 250000,
      owner: '0x742d35Cc6634C0532925a3b844Bc0e7595f7a0F8',
      verified: true,
      status: 'Listed',
      images: []
    },
    {
      id: 2,
      title: 'Detached House in VI',
      description: 'Spacious 5-bedroom detached house with compound in Victoria Island',
      location: 'Victoria Island, Lagos, Nigeria',
      price: 550000,
      owner: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
      verified: true,
      status: 'Listed',
      images: []
    },
    {
      id: 3,
      title: 'Modern Studio Apartment',
      description: 'Cozy studio apartment perfect for students or young professionals',
      location: 'Ikeja, Lagos, Nigeria',
      price: 80000,
      owner: '0x1234567890123456789012345678901234567890',
      verified: true,
      status: 'Listed',
      images: []
    },
    {
      id: 4,
      title: 'Commercial Property - Office Space',
      description: 'Prime office space on Awolowo Road, suitable for corporate businesses',
      location: 'Ikoyi, Lagos, Nigeria',
      price: 400000,
      owner: '0x9876543210987654321098765432109876543210',
      verified: false,
      status: 'Verification Pending',
      images: []
    },
    {
      id: 5,
      title: 'Residential Plot - Ibeju Lekki',
      description: '500sqm residential plot in a gated community with excellent amenities',
      location: 'Ibeju Lekki, Lagos, Nigeria',
      price: 95000,
      owner: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
      verified: true,
      status: 'Listed',
      images: []
    },
    {
      id: 6,
      title: 'Duplex in Ajah',
      description: 'Semi-detached duplex in a serene environment with excellent security',
      location: 'Ajah, Lagos, Nigeria',
      price: 320000,
      owner: '0x1111111111111111111111111111111111111111',
      verified: true,
      status: 'Listed',
      images: []
    }
  ])

  const [filters, setFilters] = useState({
    searchTerm: '',
    priceRange: 'all',
    verified: false
  })

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(filters.searchTerm.toLowerCase())
    
    const matchesPrice = filters.priceRange === 'all' ||
      (filters.priceRange === 'under-100k' && property.price < 100000) ||
      (filters.priceRange === '100k-300k' && property.price >= 100000 && property.price < 300000) ||
      (filters.priceRange === 'above-300k' && property.price >= 300000)
    
    const matchesVerified = !filters.verified || property.verified

    return matchesSearch && matchesPrice && matchesVerified
  })

  return (
    <div className="marketplace-container">
      <div className="marketplace-header">
        <h2>🏘️ Property Marketplace</h2>
        <p>Discover verified properties from trusted sellers across Nigeria</p>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by location or property name..."
            name="searchTerm"
            value={filters.searchTerm}
            onChange={handleFilterChange}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label>Price Range:</label>
            <select 
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="all">All Prices</option>
              <option value="under-100k">Under $100k</option>
              <option value="100k-300k">$100k - $300k</option>
              <option value="above-300k">Above $300k</option>
            </select>
          </div>

          <div className="filter-group">
            <label>
              <input
                type="checkbox"
                name="verified"
                checked={filters.verified}
                onChange={handleFilterChange}
                className="filter-checkbox"
              />
              Verified Only
            </label>
          </div>
        </div>
      </div>

      <div className="results-info">
        <p>Showing <strong>{filteredProperties.length}</strong> properties</p>
      </div>

      <div className="properties-grid">
        {filteredProperties.length > 0 ? (
          filteredProperties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onPropertySelect}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No properties found matching your criteria</p>
            <button 
              onClick={() => setFilters({ searchTerm: '', priceRange: 'all', verified: false })}
              className="btn-reset"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyMarketplace
