import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import PropertyMarketplace from './pages/PropertyMarketplace'
import Dashboard from './pages/Dashboard'
import PropertyDetail from './pages/PropertyDetail'

function App() {
  const [currentPage, setCurrentPage] = useState('marketplace')
  const [selectedPropertyId, setSelectedPropertyId] = useState(null)
  const [userAddress, setUserAddress] = useState(null)

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
      />
      
      <main className="main-content">
        {currentPage === 'marketplace' && (
          <PropertyMarketplace 
            onPropertySelect={handlePropertySelect}
            userAddress={userAddress}
          />
        )}
        
        {currentPage === 'dashboard' && (
          <Dashboard 
            userAddress={userAddress}
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
