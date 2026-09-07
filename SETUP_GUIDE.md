# Ezco Project Setup Guide

## 📋 Quick Checklist

- [ ] Clone repository
- [ ] Install Node.js dependencies
- [ ] Create `.env.local` from `.env.example`
- [ ] Set up blockchain RPC endpoints
- [ ] Configure MetaMask/wallet
- [ ] Deploy smart contracts to testnet
- [ ] Start frontend development server
- [ ] Test basic functionality

## 🔧 Detailed Setup Steps

### 1. Prerequisites Installation

```bash
# Install Node.js (minimum v16)
# Download from https://nodejs.org

# Verify installation
node --version
npm --version
```

### 2. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/ezco.git
cd ezco

# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 3. Environment Configuration

```bash
# Copy example environment file
cp .env.example .env.local

# Edit .env.local with your values
# - Get RPC URL from Alchemy, Infura, or QuickNode
# - Set contract addresses after deployment
```

### 4. Hardhat Node Setup (Optional)

For local development without testnet gas:

```bash
# Terminal 1: Start local Hardhat node
npx hardhat node

# Terminal 2: Deploy to local network
npx hardhat run scripts/deploy.ts --network localhost

# Copy the contract address to .env.local
```

### 5. Testnet Setup (Sepolia Recommended)

```bash
# Get Sepolia ETH from faucet
# https://sepoliafaucet.com

# Verify balance
# https://sepolia.etherscan.io

# Deploy to Sepolia
npx hardhat run scripts/deploy.ts --network sepolia
```

### 6. Frontend Setup

```bash
cd client

# Create .env.local
cp .env.example .env.local

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in browser
```

### 7. MetaMask Configuration

1. Open MetaMask extension
2. Add Network:
   - Network Name: Ethereum Sepolia
   - RPC URL: https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
   - Chain ID: 11155111
   - Currency: SepoliaETH

3. Import test account from Hardhat (if using local node)

## 🧪 Testing

### Run Smart Contract Tests

```bash
# All tests
npx hardhat test

# Specific test file
npx hardhat test test/RealEstateTrust.test.ts

# With gas reporting
REPORT_GAS=true npx hardhat test

# With coverage
npx hardhat coverage
```

### Manual Testing Checklist

- [ ] Connect wallet to dApp
- [ ] List a test property
- [ ] Verify property as admin
- [ ] Create transaction
- [ ] Fund escrow
- [ ] Complete transaction
- [ ] Create and resolve dispute

## 🚀 Development Workflow

### Daily Development

```bash
# Terminal 1: Start Hardhat node
npx hardhat node

# Terminal 2: Deploy contracts
npx hardhat run scripts/deploy.ts --network localhost

# Terminal 3: Start frontend
cd client
npm run dev

# Terminal 4: Run tests
npx hardhat test --watch
```

### Code Quality

```bash
# Lint Solidity
npx hardhat compile

# Format code
npx prettier --write .

# Type check TypeScript
npx tsc --noEmit
```

## 🐛 Troubleshooting

### Issue: "RPC URL not set"
**Solution**: Check `.env.local` file has `VITE_RPC_URL` set

### Issue: "Contract not found at address"
**Solution**: Redeploy contract and update address in `.env.local`

### Issue: "Insufficient funds"
**Solution**: Get testnet ETH from faucet or use local Hardhat node

### Issue: "MetaMask connection fails"
**Solution**: 
1. Check RPC URL in `.env.local`
2. Verify Chain ID matches network
3. Restart browser and MetaMask

### Issue: "Port 5173 already in use"
**Solution**: `npx hardhat run scripts/deploy.ts --network localhost` or change port

## 📦 Project Dependencies

### Root Dependencies
- `hardhat` - Smart contract development framework
- `ethers` - Ethereum library
- `typescript` - Type safety

### Client Dependencies (client/package.json)
- `react` - UI library
- `vite` - Build tool
- `wagmi` - React hooks for web3
- `viem` - Ethereum client

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `hardhat.config.ts` | Hardhat configuration |
| `contracts/RealEstateTrust.sol` | Main smart contract |
| `scripts/deploy.ts` | Deployment script |
| `client/src/App.jsx` | React app entry |
| `.env.local` | Environment variables (git ignored) |
| `package.json` | Dependencies and scripts |

## 🌐 Useful Links

- **Hardhat Docs**: https://hardhat.org
- **Ethers.js Docs**: https://docs.ethers.org
- **OpenZeppelin**: https://docs.openzeppelin.com
- **Sepolia Faucet**: https://sepoliafaucet.com
- **Sepolia Explorer**: https://sepolia.etherscan.io

## 📞 Getting Help

1. Check troubleshooting section above
2. Search GitHub Issues
3. Ask in Discord community
4. Create new GitHub issue with:
   - Description of problem
   - Steps to reproduce
   - Error message/logs
   - Environment info (OS, Node version, etc.)

## ✅ Next Steps After Setup

1. Review smart contract code
2. Run tests to ensure everything works
3. Deploy to Sepolia testnet
4. Interact with contract via frontend
5. Start development on new features

---

**Need help? Check the main [README.md](README.md) for more information.**
