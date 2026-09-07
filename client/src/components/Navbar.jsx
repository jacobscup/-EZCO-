import React from 'react'
import '../styles/Navbar.css'

function Navbar({ currentPage, onNavigate, userAddress }) {
  const handleConnectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        // Handle connection
        console.log('Wallet connected:', accounts[0])
      } catch (error) {
        console.error('Wallet connection failed:', error)
      }
    }
  }

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
              <span className="wallet-address">
                {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
              </span>
              <span className="wallet-badge">✓ Connected</span>
            </div>
          ) : (
            <button className="btn-connect" onClick={handleConnectWallet}>
              🔗 Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
