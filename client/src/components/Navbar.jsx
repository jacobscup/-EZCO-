import React from 'react'
import '../styles/Navbar.css'
import { formatAddress } from '../contract'

function Navbar({ currentPage, onNavigate, userAddress, onConnect, walletError }) {

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1 className="logo">🏠 EZCO</h1>
          <p className="tagline">Real Estate Trust Platform</p>
        </div>

        <ul className="nav-menu">
          <li>
            <button 
              className={`nav-link ${currentPage === 'marketplace' ? 'active' : ''}`}
              onClick={() => onNavigate('marketplace')}
            >
              🏘️ Marketplace
            </button>
          </li>
          <li>
            <button 
              className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => onNavigate('dashboard')}
            >
              📊 Dashboard
            </button>
          </li>
          <li>
            <button 
              className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
              onClick={() => onNavigate('about')}
            >
              ℹ️ About
            </button>
          </li>
        </ul>

        <div className="navbar-right">
          {userAddress ? (
            <div className="wallet-info">
              <span className="wallet-address">{formatAddress(userAddress)}</span>
              <span className="wallet-badge">✓ Connected</span>
            </div>
          ) : (
            <button className="btn-connect" onClick={onConnect}>
              Connect Wallet
            </button>
          )}
          {walletError && <span className="wallet-error">{walletError}</span>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
