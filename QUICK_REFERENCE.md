# ⚡ Ezco Quick Reference

## 🚀 Start Here

```bash
cd c:\Users\USER\ezco

# 1. Install dependencies
npm run setup

# 2. Start blockchain (Terminal 1)
npm run node

# 3. Deploy contracts (Terminal 2)
npm run deploy:local

# 4. Start frontend (Terminal 3)
npm run client:dev

# Open: http://localhost:5173
```

## 📁 Important Files

| File | Edit for... |
|------|----------|
| `.env.local` | RPC URL, contract addresses, network settings |
| `contracts/RealEstateTrust.sol` | Smart contract logic |
| `client/src/App.jsx` | Frontend main component |
| `hardhat.config.ts` | Hardhat configuration |
| `package.json` | Root dependencies & scripts |
| `client/package.json` | Frontend dependencies |

## 🛠️ Common Commands

```bash
# Development
npm run node              # Start local blockchain
npm run test              # Run tests
npm run compile           # Compile contracts
npm run client:dev        # Start frontend dev server

# Deployment
npm run deploy:local      # Deploy to local node
npm run deploy:sepolia    # Deploy to Sepolia testnet
npm run deploy:mainnet    # Deploy to Ethereum mainnet

# Quality
npm run coverage          # Test coverage
npm run format            # Format code
npm run client:lint       # Lint frontend
```

## 🔗 Key Endpoints

- **Frontend**: http://localhost:5173
- **Hardhat Node RPC**: http://127.0.0.1:8545
- **Block Explorer**: https://sepolia.etherscan.io

## 🔐 Smart Contract

**File**: `contracts/RealEstateTrust.sol`

**Main Functions**:
- `listProperty()` - List property
- `verifyProperty()` - Verify authenticity
- `createTransaction()` - Start transaction
- `fundTransaction()` - Deposit to escrow
- `completeTransaction()` - Finalize
- `createDispute()` - Initiate dispute
- `resolveDispute()` - Resolve (admin)

## 📝 Environment Setup

**File**: `.env.local`

```env
VITE_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
VITE_CHAIN_ID=11155111
VITE_REAL_ESTATE_TRUST_ADDRESS=0x...
VITE_USDC_ADDRESS=0x...
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run coverage
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port in use | Kill process or change port in .env.local |
| No RPC URL | Get key from Alchemy.com |
| No test ETH | Use Sepolia faucet: sepoliafaucet.com |
| MetaMask fails | Check network settings match .env.local |
| Contract not found | Redeploy and update address in .env.local |

## 📚 Documentation

- **Setup**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Full Docs**: [README.md](README.md)
- **Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **Roadmap**: [ROADMAP.md](ROADMAP.md)

## 🌐 Networks

| Network | Chain ID | RPC |
|---------|----------|-----|
| Sepolia | 11155111 | https://eth-sepolia.g.alchemy.com/v2/... |
| Mainnet | 1 | https://eth-mainnet.g.alchemy.com/v2/... |
| Polygon | 137 | https://polygon-rpc.com |
| Base | 8453 | https://mainnet.base.org |

## 👨‍💻 Directory Structure

```
ezco/
├── contracts/        # Smart contracts
├── scripts/         # Deployment scripts
├── test/            # Contract tests
├── client/          # React frontend
├── ignition/        # Deployment config
├── README.md        # Main docs
└── .env.example     # Config template
```

## 🔑 Access Control

- **Owner**: Full contract control
- **Verifier**: Verify properties
- **Arbitrator**: Resolve disputes
- **Users**: List, buy, sell properties

## 💰 Stablecoins Supported

- USDC (Circle)
- USDT (Tether)
- DAI (MakerDAO)

## 🎯 MVP Features

✅ Property listing & verification
✅ Escrow transactions
✅ Multi-party confirmation
✅ Dispute resolution
✅ React marketplace

## 📞 Quick Links

- **GitHub Repo**: [Your repo URL]
- **Discord**: [Join our community]
- **Twitter**: [@EzcoDapp]
- **Website**: [ezco.ng]

## 🚀 Next Milestones

1. ✅ Setup complete
2. ⏳ Deploy to Sepolia
3. ⏳ Frontend user testing
4. ⏳ Security audit
5. ⏳ Mainnet launch

---

**Questions? See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed help.**
