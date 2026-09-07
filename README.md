# Ezco - Real Estate Trust Platform for Nigerians in Diaspora

## 🏢 Project Overview

Ezco is a decentralized application (dApp) built to solve the trust problem between real estate owners and Nigerians in the diaspora. The platform leverages blockchain technology to facilitate secure, transparent, and trustworthy property transactions without intermediaries.

### Problem Statement
Nigerians in diaspora often face significant challenges when investing in real estate back home:
- **Trust Issues**: Difficulty verifying property authenticity and ownership
- **Fraud Risk**: Susceptibility to property scams and double-selling
- **Payment Concerns**: Lack of secure escrow mechanisms
- **Dispute Resolution**: Limited recourse in case of conflicts
- **Distance**: Geographic distance makes verification and inspection difficult

### Solution
Ezco provides:
- **Blockchain-Based Verification**: Properties are verified by trusted entities on-chain
- **Smart Escrow**: Automated escrow using stablecoins (USDC, USDT, etc.)
- **Dispute Resolution**: Arbitration system for conflict resolution
- **Multi-Signature Verification**: Multiple parties must confirm transactions
- **Immutable Records**: All transactions recorded on blockchain for transparency

## 🏗️ Project Structure

```
ezco/
├── contracts/              # Smart contracts (Solidity)
│   ├── RealEstateTrust.sol # Main contract
│   └── interfaces/         # Contract interfaces
├── scripts/                # Deployment and utility scripts
│   ├── deploy.ts          # Contract deployment
│   └── verify.ts          # Property verification utilities
├── test/                   # Smart contract tests
│   └── RealEstateTrust.test.ts
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── App.jsx        # Main app component
│   ├── index.html
│   └── vite.config.js
├── ignition/               # Hardhat Ignition deployment configs
├── hardhat.config.ts       # Hardhat configuration
└── package.json            # Root dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- A Ethereum-compatible wallet (MetaMask, etc.)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ezco
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

3. **Set up environment variables**
Create a `.env.local` file in the root:
```env
# Blockchain RPC
VITE_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
VITE_CHAIN_ID=11155111

# Contract addresses (after deployment)
VITE_REAL_ESTATE_TRUST_ADDRESS=0x...

# Stablecoin addresses
VITE_USDC_ADDRESS=0x...
VITE_USDT_ADDRESS=0x...
```

### Development

1. **Start local blockchain (optional)**
```bash
npx hardhat node
```

2. **Deploy contracts**
```bash
npx hardhat run scripts/deploy.ts --network sepolia
# or for local testing
npx hardhat run scripts/deploy.ts --network localhost
```

3. **Start frontend development server**
```bash
cd client
npm run dev
# Opens at http://localhost:5173
```

4. **Run contract tests**
```bash
npx hardhat test
```

## 📋 Smart Contract Features

### Core Functions

#### Property Management
- `listProperty()` - List a new property
- `verifyProperty()` - Verify property authenticity (verifiers only)
- `getProperty()` - Retrieve property details

#### Transaction Management
- `createTransaction()` - Initiate a property transaction
- `fundTransaction()` - Deposit funds into escrow
- `completeTransaction()` - Finalize transaction (both parties confirm)

#### Dispute Resolution
- `createDispute()` - Initiate a dispute
- `resolveDispute()` - Resolve dispute (arbitrators only)

#### Admin Functions
- `addVerifier()` - Add trusted property verifier
- `addEscrowAgent()` - Add escrow agent
- `addArbitrator()` - Add dispute arbitrator

### Security Features
- Role-based access control (Owner, Verifier, Arbitrator)
- Escrow-based fund management
- Multi-signature confirmation
- Dispute resolution mechanism
- Event logging for all transactions

## 🎨 Frontend Features

The React client will include:

1. **Property Marketplace**
   - Browse available properties
   - Advanced filtering and search
   - Property details and media gallery

2. **User Dashboard**
   - Manage listings (for sellers)
   - Track transaction history
   - View portfolio

3. **Transaction Management**
   - Create and fund transactions
   - Confirm transaction completion
   - Track escrow status

4. **Dispute Management**
   - Create disputes
   - Track dispute status
   - View resolution details

5. **Wallet Integration**
   - MetaMask connection
   - Balance display
   - Transaction signing

## 🔐 Security Considerations

- Smart contracts follow OpenZeppelin standards
- Input validation and access control on all functions
- Escrow mechanism prevents fraud
- Immutable transaction records
- Multi-party confirmation for critical operations
- Arbitration for dispute resolution

## 📡 Blockchain Network

**Primary Networks:**
- **Ethereum Mainnet** - Production deployment
- **Ethereum Sepolia** - Testnet for development
- **Polygon** - Alternative low-cost option
- **Base** - Coinbase L2 alternative

**Supported Stablecoins:**
- USDC (Circle)
- USDT (Tether)
- DAI (MakerDAO)

## 🧪 Testing

Run the test suite:
```bash
# All tests
npx hardhat test

# Specific test file
npx hardhat test test/RealEstateTrust.test.ts

# With coverage
npx hardhat coverage
```

## 📚 API Documentation

### Smart Contract Events

```solidity
event PropertyListed(uint256 indexed propertyId, address indexed owner, uint256 price);
event PropertyVerified(uint256 indexed propertyId, address indexed verifier);
event TransactionCreated(uint256 indexed transactionId, uint256 indexed propertyId, address indexed buyer, uint256 amount);
event TransactionFunded(uint256 indexed transactionId, address indexed buyer);
event TransactionCompleted(uint256 indexed transactionId);
event DisputeCreated(uint256 indexed disputeId, uint256 indexed transactionId);
event DisputeResolved(uint256 indexed disputeId, address indexed resolver);
event EscrowReleased(uint256 indexed transactionId, address indexed recipient, uint256 amount);
```

## 🔄 Transaction Flow

1. **Property Listing**: Owner lists property with details and price
2. **Verification**: Trusted verifier confirms property authenticity
3. **Transaction Creation**: Buyer initiates transaction
4. **Funding**: Buyer deposits funds into smart contract escrow
5. **Confirmation**: Both parties confirm transaction details
6. **Completion**: Funds released to seller, ownership transferred
7. **Dispute (Optional)**: If issues arise, dispute resolution mechanism activates

## 🌍 Deployment

### Testnet Deployment
```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

### Mainnet Deployment
```bash
npx hardhat run scripts/deploy.ts --network ethereum
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

- **GitHub Issues**: Report bugs and request features
- **Email**: support@ezco.ng
- **Discord**: Join our community

## 🙏 Acknowledgments

- Hardhat & ethers.js teams for excellent development tools
- Ethereum community for smart contract best practices
- OpenZeppelin for security libraries

## ⚠️ Disclaimer

This is an educational project. Smart contracts have not undergone full security audit. Use at your own risk. Always conduct thorough testing before mainnet deployment.

---

**Happy building! 🚀**
