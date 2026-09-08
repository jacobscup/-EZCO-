import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { sepolia } from 'viem/chains'

export const CONTRACT_ADDRESS = '0x38c528e9462f0dab2705c2a2f9d1eee768d93ded'
export const SEPOLIA_CHAIN_ID = sepolia.id
export const DEFAULT_TOKEN = '0x1c7D4B196Cb0C7B01d743Fbc6116A902379C7238'

export const contractAbi = [
  {
    type: 'function', name: 'propertyCounter', stateMutability: 'view', inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    type: 'function', name: 'getProperty', stateMutability: 'view',
    inputs: [{ name: '_propertyId', type: 'uint256' }],
    outputs: [{ name: '', type: 'tuple', components: [
      { name: 'id', type: 'uint256' }, { name: 'owner', type: 'address' },
      { name: 'title', type: 'string' }, { name: 'description', type: 'string' },
      { name: 'location', type: 'string' }, { name: 'price', type: 'uint256' },
      { name: 'paymentToken', type: 'address' }, { name: 'status', type: 'uint8' },
      { name: 'createdAt', type: 'uint256' }, { name: 'verified', type: 'bool' },
      { name: 'verifiers', type: 'address[]' },
    ] }],
  },
  {
    type: 'function', name: 'listProperty', stateMutability: 'nonpayable',
    inputs: [
      { name: '_title', type: 'string' }, { name: '_description', type: 'string' },
      { name: '_location', type: 'string' }, { name: '_price', type: 'uint256' },
      { name: '_paymentToken', type: 'address' },
    ], outputs: [],
  },
  {
    type: 'function', name: 'createTransaction', stateMutability: 'nonpayable',
    inputs: [{ name: '_propertyId', type: 'uint256' }, { name: '_escrowAgent', type: 'string' }], outputs: [],
  },
]

export const publicClient = createPublicClient({ chain: sepolia, transport: http(import.meta.env.VITE_SEPOLIA_RPC_URL || 'https://ethereum-sepolia-rpc.publicnode.com') })

export function getWalletClient() {
  if (!window.ethereum) throw new Error('Install MetaMask to connect a wallet.')
  return createWalletClient({ chain: sepolia, transport: custom(window.ethereum) })
}

export function formatAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const propertyStatuses = ['Listed', 'Under offer', 'Sold', 'Delisted']
