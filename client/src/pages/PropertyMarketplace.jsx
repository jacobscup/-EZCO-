import React, { useEffect, useState } from 'react'
import PropertyCard from '../components/PropertyCard'
import '../styles/PropertyMarketplace.css'
import { CONTRACT_ADDRESS, contractAbi, DEFAULT_TOKEN, propertyStatuses, publicClient, getWalletClient } from '../contract'

function PropertyMarketplace({ onPropertySelect, userAddress, onConnect }) {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [filters, setFilters] = useState({ searchTerm: '', verified: false })
  const [form, setForm] = useState({ title: '', description: '', location: '', price: '', paymentToken: DEFAULT_TOKEN })

  const loadProperties = async () => {
    setLoading(true)
    try {
      const count = await publicClient.readContract({ address: CONTRACT_ADDRESS, abi: contractAbi, functionName: 'propertyCounter' })
      const loaded = []
      for (let id = 1n; id <= count; id += 1n) {
        const property = await publicClient.readContract({ address: CONTRACT_ADDRESS, abi: contractAbi, functionName: 'getProperty', args: [id] })
        loaded.push({ ...property, id: Number(property.id), price: Number(property.price), status: propertyStatuses[Number(property.status)] })
      }
      setProperties(loaded.reverse())
    } catch (error) {
      setMessage(error.shortMessage || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadProperties() }, [])

  const updateForm = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const listProperty = async (event) => {
    event.preventDefault()
    if (!userAddress) return onConnect()
    setMessage('Confirm the listing transaction in MetaMask...')
    try {
      const walletClient = getWalletClient()
      const [account] = await walletClient.requestAddresses()
      const hash = await walletClient.writeContract({ address: CONTRACT_ADDRESS, abi: contractAbi, functionName: 'listProperty', account, args: [form.title, form.description, form.location, BigInt(form.price), form.paymentToken] })
      await publicClient.waitForTransactionReceipt({ hash })
      setMessage('Property listed on Sepolia.')
      setForm({ title: '', description: '', location: '', price: '', paymentToken: DEFAULT_TOKEN })
      await loadProperties()
    } catch (error) {
      setMessage(error.shortMessage || error.message)
    }
  }

  const filteredProperties = properties.filter((property) => {
    const term = filters.searchTerm.toLowerCase()
    return (!term || property.title.toLowerCase().includes(term) || property.location.toLowerCase().includes(term)) && (!filters.verified || property.verified)
  })

  return (
    <div className="marketplace-container">
      <div className="marketplace-header">
        <p className="eyebrow">LIVE ON SEPOLIA</p>
        <h2>Property Marketplace</h2>
        <p>Browse listings stored on the RealEstateTrust contract.</p>
        <a className="contract-link" href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`} target="_blank" rel="noreferrer">View contract on Etherscan ↗</a>
      </div>

      <form className="listing-form" onSubmit={listProperty}>
        <div><p className="form-kicker">TEST THE PROTOCOL</p><h3>List a property</h3></div>
        <input name="title" placeholder="Property title" value={form.title} onChange={updateForm} required />
        <input name="location" placeholder="Location" value={form.location} onChange={updateForm} required />
        <input name="price" type="number" min="1" placeholder="Price in token units" value={form.price} onChange={updateForm} required />
        <input name="paymentToken" placeholder="ERC-20 token address" value={form.paymentToken} onChange={updateForm} required />
        <textarea name="description" placeholder="Short description" value={form.description} onChange={updateForm} required />
        <button className="btn-primary" type="submit">{userAddress ? 'List on Sepolia' : 'Connect wallet to list'}</button>
      </form>

      {message && <div className="chain-message">{message}</div>}
      <div className="filters-section">
        <input type="text" placeholder="Search by location or property name..." name="searchTerm" value={filters.searchTerm} onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })} className="search-input" />
        <label><input type="checkbox" checked={filters.verified} onChange={(e) => setFilters({ ...filters, verified: e.target.checked })} /> Verified only</label>
      </div>
      <div className="results-info"><p>Showing <strong>{filteredProperties.length}</strong> on-chain properties</p>{loading && <p>Reading Sepolia...</p>}</div>
      <div className="properties-grid">
        {filteredProperties.map((property) => <PropertyCard key={property.id} property={property} onSelect={onPropertySelect} />)}
        {!loading && !filteredProperties.length && <div className="no-results"><p>No on-chain properties match this search yet.</p></div>}
      </div>
    </div>
  )
}

export default PropertyMarketplace
