import React, { useState } from 'react'
import '../styles/Dashboard.css'

function Dashboard({ userAddress, onNavigate }) {
  const [activeTab, setActiveTab] = useState('listings')

  // Mock data for user listings
  const userListings = [
    {
      id: 1,
      title: 'Luxury Apartment in Lekki',
      price: 250000,
      status: 'Listed',
      views: 234,
      offers: 5,
      verified: true
    },
    {
      id: 2,
      title: 'Commercial Property - Office Space',
      price: 400000,
      status: 'Verification Pending',
      views: 45,
      offers: 0,
      verified: false
    }
  ]

  // Mock data for transactions
  const userTransactions = [
    {
      id: 1,
      propertyTitle: 'Duplex in Ajah',
      type: 'Purchase',
      amount: 320000,
      status: 'In Escrow',
      date: '2024-08-28',
      seller: '0x1111111111111111111111111111111111111111'
    },
    {
      id: 2,
      propertyTitle: 'Residential Plot - Ibeju Lekki',
      type: 'Sale',
      amount: 95000,
      status: 'Completed',
      date: '2024-07-15',
      buyer: '0x2222222222222222222222222222222222222222'
    }
  ]

  // Mock data for disputes
  const userDisputes = [
    {
      id: 1,
      propertyTitle: 'Modern Studio Apartment',
      status: 'Pending Arbitration',
      createdDate: '2024-08-20',
      description: 'Dispute regarding property condition'
    }
  ]

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>📊 My Dashboard</h2>
        {userAddress && (
          <p className="user-address">
            Account: {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
          </p>
        )}
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📍</div>
          <div className="stat-content">
            <p className="stat-label">Total Listings</p>
            <p className="stat-value">{userListings.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <p className="stat-label">Active Transactions</p>
            <p className="stat-value">{userTransactions.filter(t => t.status === 'In Escrow').length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <p className="stat-label">Completed Sales</p>
            <p className="stat-value">{userTransactions.filter(t => t.status === 'Completed').length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <p className="stat-label">Disputes</p>
            <p className="stat-value">{userDisputes.length}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'listings' ? 'active' : ''}`}
          onClick={() => setActiveTab('listings')}
        >
          My Listings
        </button>
        <button 
          className={`tab-button ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
        <button 
          className={`tab-button ${activeTab === 'disputes' ? 'active' : ''}`}
          onClick={() => setActiveTab('disputes')}
        >
          Disputes
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'listings' && (
          <div className="listings-section">
            <div className="section-header">
              <h3>My Property Listings</h3>
              <button className="btn-add-listing">+ List New Property</button>
            </div>

            {userListings.length > 0 ? (
              <div className="listings-table">
                <div className="table-header">
                  <div className="col-title">Property</div>
                  <div className="col-price">Price</div>
                  <div className="col-status">Status</div>
                  <div className="col-views">Views</div>
                  <div className="col-offers">Offers</div>
                  <div className="col-actions">Actions</div>
                </div>

                {userListings.map(listing => (
                  <div key={listing.id} className="table-row">
                    <div className="col-title">
                      <div className="listing-info">
                        <p className="listing-title">{listing.title}</p>
                        {listing.verified && <span className="badge-verified">✓ Verified</span>}
                      </div>
                    </div>
                    <div className="col-price">${listing.price.toLocaleString()}</div>
                    <div className="col-status">
                      <span className={`status-badge ${listing.status.toLowerCase().replace(' ', '-')}`}>
                        {listing.status}
                      </span>
                    </div>
                    <div className="col-views">{listing.views}</div>
                    <div className="col-offers">{listing.offers}</div>
                    <div className="col-actions">
                      <button className="btn-small">Edit</button>
                      <button className="btn-small">View</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No listings yet</p>
                <button className="btn-primary">List Your First Property</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="transactions-section">
            <h3>Transaction History</h3>

            {userTransactions.length > 0 ? (
              <div className="transactions-list">
                {userTransactions.map(transaction => (
                  <div key={transaction.id} className="transaction-card">
                    <div className="transaction-header">
                      <h4>{transaction.propertyTitle}</h4>
                      <span className={`status-badge ${transaction.status.toLowerCase().replace(' ', '-')}`}>
                        {transaction.status}
                      </span>
                    </div>
                    <div className="transaction-details">
                      <p><strong>Type:</strong> {transaction.type}</p>
                      <p><strong>Amount:</strong> ${transaction.amount.toLocaleString()}</p>
                      <p><strong>Date:</strong> {transaction.date}</p>
                      {transaction.seller && (
                        <p><strong>Seller:</strong> {transaction.seller.slice(0, 6)}...{transaction.seller.slice(-4)}</p>
                      )}
                      {transaction.buyer && (
                        <p><strong>Buyer:</strong> {transaction.buyer.slice(0, 6)}...{transaction.buyer.slice(-4)}</p>
                      )}
                    </div>
                    <button className="btn-view-transaction">View Details</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No transactions yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'disputes' && (
          <div className="disputes-section">
            <h3>Disputes</h3>

            {userDisputes.length > 0 ? (
              <div className="disputes-list">
                {userDisputes.map(dispute => (
                  <div key={dispute.id} className="dispute-card">
                    <div className="dispute-header">
                      <h4>{dispute.propertyTitle}</h4>
                      <span className={`status-badge ${dispute.status.toLowerCase().replace(' ', '-')}`}>
                        {dispute.status}
                      </span>
                    </div>
                    <div className="dispute-details">
                      <p><strong>Description:</strong> {dispute.description}</p>
                      <p><strong>Created:</strong> {dispute.createdDate}</p>
                    </div>
                    <button className="btn-view-dispute">View Dispute Details</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No disputes</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
