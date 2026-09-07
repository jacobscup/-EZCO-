# Contributing to Ezco

Thank you for your interest in contributing to Ezco! This guide will help you get started.

## 🎯 How to Contribute

We welcome contributions in several areas:

### Smart Contracts
- Bug fixes and improvements
- Gas optimization
- Additional features for the protocol
- Security enhancements

### Frontend
- UI/UX improvements
- New features and pages
- Bug fixes
- Performance optimization
- Accessibility improvements

### Documentation
- README improvements
- API documentation
- Tutorial and guides
- Translation

### Testing
- Unit tests for smart contracts
- Integration tests
- End-to-end tests
- Security audits

## 🚀 Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/ezco.git
   cd ezco
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   # or
   git checkout -b fix/bug-description
   ```

3. **Make your changes**
   - Follow the code style guidelines
   - Write clear, descriptive commit messages
   - Add tests for new functionality

4. **Test your changes**
   ```bash
   # Smart contracts
   npm run test

   # Frontend
   cd client
   npm run lint
   ```

5. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   git push origin feature/amazing-feature
   ```

6. **Create a Pull Request**
   - Describe what changes you made and why
   - Reference any related issues
   - Include screenshots if UI changes

## 📝 Commit Message Guidelines

Use conventional commit format:

```
type(scope): subject

body

footer
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, etc.

### Examples
```bash
git commit -m "feat(contracts): add property escrow functionality"
git commit -m "fix(frontend): resolve wallet connection issue"
git commit -m "docs: update setup guide"
```

## 💻 Code Style

### Solidity
- Follow [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- Use 4 spaces for indentation
- Add natspec comments for functions
- Example:
  ```solidity
  /// @notice Description of function
  /// @param _param Description of parameter
  /// @return Description of return value
  function myFunction(uint256 _param) external view returns (uint256) {
      // Implementation
  }
  ```

### TypeScript/JavaScript
- Use ESLint and Prettier for formatting
- Use meaningful variable names
- Add comments for complex logic
- Example:
  ```typescript
  // Good
  const fetchUserProperties = async (userId: string) => {
    // Implementation
  };

  // Avoid
  const fp = async (u: string) => {
    // Implementation
  };
  ```

### React Components
- Use functional components with hooks
- Use descriptive component names
- Prop validation with TypeScript
- Example:
  ```typescript
  interface PropertyCardProps {
    id: number;
    title: string;
    price: number;
    onSelect: (id: number) => void;
  }

  export const PropertyCard: React.FC<PropertyCardProps> = ({
    id,
    title,
    price,
    onSelect,
  }) => {
    // Implementation
  };
  ```

## 🧪 Testing Requirements

### Smart Contracts
- Write tests for all public functions
- Test both success and failure cases
- Include edge cases
- Example:
  ```typescript
  describe("RealEstateTrust", () => {
    it("should list property with valid details", async () => {
      // Test implementation
    });

    it("should reject property with invalid price", async () => {
      // Test implementation
    });
  });
  ```

### Frontend
- Write tests for critical components
- Test user interactions
- Test error handling
- Use React Testing Library

## 📋 Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] New tests added for new functionality
- [ ] Documentation updated (if needed)
- [ ] No console errors or warnings
- [ ] Commits are squashed/clean
- [ ] PR description is clear and complete
- [ ] No breaking changes (or documented)
- [ ] Changes are focused on one feature/fix

## 🔍 Code Review Process

1. **Automated Checks**
   - Tests must pass
   - Linting must pass
   - Coverage should not decrease

2. **Peer Review**
   - At least one approval required
   - Address all comments and feedback
   - Request re-review after changes

3. **Merge**
   - Fast-forward merge to main
   - Delete feature branch

## 🐛 Reporting Bugs

Found a bug? Open an issue with:

1. **Title**: Clear, descriptive title
2. **Description**: What is the issue?
3. **Steps to Reproduce**: How to reproduce it
4. **Expected Behavior**: What should happen
5. **Actual Behavior**: What actually happens
6. **Screenshots/Logs**: If applicable
7. **Environment**: 
   - OS and Node version
   - Browser and extensions
   - Network (testnet, mainnet, etc.)

### Example Bug Report
```markdown
## Bug: Property verification fails with USDC token

### Description
When verifying a property with USDC as payment token, the verification fails with error.

### Steps to Reproduce
1. List property with USDC payment token
2. Request verification
3. Verifier confirms property
4. Error occurs

### Expected Behavior
Property should be marked as verified

### Actual Error
Error: "Payment token not recognized"

### Screenshot
[attach screenshot]

### Environment
- OS: Windows 11
- Node: v18.16.0
- Browser: Chrome 115
- Network: Sepolia testnet
```

## 💡 Feature Requests

Have a feature idea? Open an issue with:

1. **Title**: Feature description
2. **Use Case**: Why is this needed?
3. **Proposed Solution**: How should it work?
4. **Alternatives**: Other options?

## 📚 Resources

- [Solidity Docs](https://docs.soliditylang.org)
- [Hardhat Docs](https://hardhat.org)
- [ethers.js Docs](https://docs.ethers.org)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)

## 🎓 Development Tips

### Local Testing
```bash
# Start local node
npm run node

# In another terminal, deploy
npm run deploy:local

# Run tests
npm run test

# Frontend dev
npm run client:dev
```

### Debugging Smart Contracts
```bash
// Add console.log in Solidity
import "hardhat/console.sol";

contract MyContract {
  function myFunction() public {
    console.log("Debug value:", someValue);
  }
}
```

### Debugging Frontend
```typescript
// Use browser DevTools
console.log("State:", state);
// Or use debugger
debugger;
```

## 🙏 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help new contributors
- Report inappropriate behavior

## ❓ Questions?

- Check existing issues and discussions
- Ask in Discord community
- Create a discussion thread

---

**Thank you for contributing to Ezco! Together we're building a trustworthy real estate platform for everyone.**
