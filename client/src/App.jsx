import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import PropertyMarketplace from './pages/PropertyMarketplace'
import Dashboard from './pages/Dashboard'
import PropertyDetail from './pages/PropertyDetail'
import { getWalletClient, SEPOLIA_CHAIN_ID } from './contract'

function App() {
  const [currentPage, setCurrentPage] = useState('marketplace')
  const [selectedPropertyId, setSelectedPropertyId] = useState(null)
  const [userAddress, setUserAddress] = useState(null)
  const [walletError, setWalletError] = useState('')

  const connectWallet = async () => {
    try {
      setWalletError('')
      const walletClient = getWalletClient()
      const [address] = await walletClient.requestAddresses()
      const chainId = await walletClient.getChainId()
      if (chainId !== SEPOLIA_CHAIN_ID) {
        setWalletError('Switch MetaMask to Sepolia to use the app.')
      }
      setUserAddress(address)
    } catch (error) {
      setWalletError(error.shortMessage || error.message)
    }
  }

  useEffect(() => {
    if (!window.ethereum) return undefined
    const handleAccountsChanged = (accounts) => setUserAddress(accounts[0] || null)
    window.ethereum.on('accountsChanged', handleAccountsChanged)
    return () => window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
  }, [])

  const handlePropertySelect = (propertyId) => {
    setSelectedPropertyId(propertyId)
    setCurrentPage('property-detail')
  }

  const handleNavigate = (page) => {
    setCurrentPage(page)
    setSelectedPropertyId(null)
  }

  return (
    <div className="app">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        userAddress={userAddress}
        onConnect={connectWallet}
        walletError={walletError}
      />
      
      <main className="main-content">
        {currentPage === 'marketplace' && (
          <PropertyMarketplace 
            onPropertySelect={handlePropertySelect}
            userAddress={userAddress}
            onConnect={connectWallet}
          />
        )}
        
        {currentPage === 'dashboard' && (
          <Dashboard 
            userAddress={userAddress}
            onConnect={connectWallet}
            onNavigate={handleNavigate}
          />
        )}
        
        {currentPage === 'property-detail' && selectedPropertyId && (
          <PropertyDetail 
            propertyId={selectedPropertyId}
            onBack={() => setCurrentPage('marketplace')}
            userAddress={userAddress}
          />
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2024 Ezco - Real Estate Trust Platform | Solving trust for Nigerians in diaspora</p>
      </footer>
    </div>
  )
}

export default App
