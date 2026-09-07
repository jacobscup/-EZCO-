// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title RealEstateTrust
 * @dev A smart contract for facilitating trust and secure real estate transactions
 * between property owners and Nigerians in diaspora.
 * 
 * Features:
 * - Property listing and verification
 * - Escrow-based transactions
 * - Multi-signature verification
 * - Dispute resolution mechanism
 * - Payment handling in stablecoins
 */

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract RealEstateTrust {
    // ==================== Data Structures ====================
    
    enum PropertyStatus { Listed, UnderOffer, Sold, Delisted }
    enum TransactionStatus { Created, Verified, Funded, Completed, Disputed, Resolved, Cancelled }
    
    struct Property {
        uint256 id;
        address owner;
        string title;
        string description;
        string location;
        uint256 price;
        address paymentToken; // USDC or other stablecoin
        PropertyStatus status;
        uint256 createdAt;
        bool verified;
        address[] verifiers;
    }
    
    struct Transaction {
        uint256 id;
        uint256 propertyId;
        address buyer;
        address seller;
        uint256 amount;
        address paymentToken;
        TransactionStatus status;
        uint256 createdAt;
        uint256 completionDeadline;
        string escrowAgent;
        bool buyerConfirmed;
        bool sellerConfirmed;
    }
    
    struct Dispute {
        uint256 id;
        uint256 transactionId;
        address initiator;
        string reason;
        uint256 createdAt;
        bool resolved;
        address resolutionAgent;
    }
    
    // ==================== State Variables ====================
    
    address public owner;
    address[] public verifiers; // Trusted entities that can verify properties
    address[] public escrowAgents; // Trusted escrow agents
    address[] public arbitrators; // Dispute resolution arbitrators
    
    uint256 public propertyCounter;
    uint256 public transactionCounter;
    uint256 public disputeCounter;
    
    uint256 public verificationFee = 0; // Free verification for now
    uint256 public platformFeePercentage = 1; // 1% platform fee
    
    mapping(uint256 => Property) public properties;
    mapping(uint256 => Transaction) public transactions;
    mapping(uint256 => Dispute) public disputes;
    mapping(address => uint256[]) public userProperties;
    mapping(address => uint256[]) public userTransactions;
    mapping(address => uint256) public escrowedFunds;
    
    // ==================== Events ====================
    
    event PropertyListed(uint256 indexed propertyId, address indexed owner, uint256 price);
    event PropertyVerified(uint256 indexed propertyId, address indexed verifier);
    event TransactionCreated(uint256 indexed transactionId, uint256 indexed propertyId, address indexed buyer, uint256 amount);
    event TransactionFunded(uint256 indexed transactionId, address indexed buyer);
    event TransactionCompleted(uint256 indexed transactionId);
    event DisputeCreated(uint256 indexed disputeId, uint256 indexed transactionId);
    event DisputeResolved(uint256 indexed disputeId, address indexed resolver);
    event EscrowReleased(uint256 indexed transactionId, address indexed recipient, uint256 amount);
    
    // ==================== Modifiers ====================
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyVerifier() {
        bool isVerifier = false;
        for (uint i = 0; i < verifiers.length; i++) {
            if (verifiers[i] == msg.sender) {
                isVerifier = true;
                break;
            }
        }
        require(isVerifier, "Only verifiers can call this function");
        _;
    }
    
    modifier onlyArbitrator() {
        bool isArbitrator = false;
        for (uint i = 0; i < arbitrators.length; i++) {
            if (arbitrators[i] == msg.sender) {
                isArbitrator = true;
                break;
            }
        }
        require(isArbitrator, "Only arbitrators can call this function");
        _;
    }
    
    // ==================== Constructor ====================
    
    constructor() {
        owner = msg.sender;
    }
    
    // ==================== Admin Functions ====================
    
    function addVerifier(address _verifier) external onlyOwner {
        verifiers.push(_verifier);
    }
    
    function addEscrowAgent(address _agent) external onlyOwner {
        escrowAgents.push(_agent);
    }
    
    function addArbitrator(address _arbitrator) external onlyOwner {
        arbitrators.push(_arbitrator);
    }
    
    function removeVerifier(address _verifier) external onlyOwner {
        for (uint i = 0; i < verifiers.length; i++) {
            if (verifiers[i] == _verifier) {
                verifiers[i] = verifiers[verifiers.length - 1];
                verifiers.pop();
                break;
            }
        }
    }
    
    // ==================== Property Functions ====================
    
    function listProperty(
        string memory _title,
        string memory _description,
        string memory _location,
        uint256 _price,
        address _paymentToken
    ) external {
        require(_price > 0, "Price must be greater than 0");
        require(_paymentToken != address(0), "Invalid payment token");
        
        propertyCounter++;
        
        Property storage property = properties[propertyCounter];
        property.id = propertyCounter;
        property.owner = msg.sender;
        property.title = _title;
        property.description = _description;
        property.location = _location;
        property.price = _price;
        property.paymentToken = _paymentToken;
        property.status = PropertyStatus.Listed;
        property.createdAt = block.timestamp;
        property.verified = false;
        
        userProperties[msg.sender].push(propertyCounter);
        
        emit PropertyListed(propertyCounter, msg.sender, _price);
    }
    
    function verifyProperty(uint256 _propertyId) external onlyVerifier {
        require(properties[_propertyId].id != 0, "Property does not exist");
        require(!properties[_propertyId].verified, "Property already verified");
        
        Property storage property = properties[_propertyId];
        property.verified = true;
        property.verifiers.push(msg.sender);
        
        emit PropertyVerified(_propertyId, msg.sender);
    }
    
    function getProperty(uint256 _propertyId) external view returns (Property memory) {
        return properties[_propertyId];
    }
    
    // ==================== Transaction Functions ====================
    
    function createTransaction(
        uint256 _propertyId,
        string memory _escrowAgent
    ) external {
        require(properties[_propertyId].id != 0, "Property does not exist");
        require(properties[_propertyId].verified, "Property must be verified first");
        require(properties[_propertyId].status == PropertyStatus.Listed, "Property not available");
        
        Property memory property = properties[_propertyId];
        
        transactionCounter++;
        
        Transaction storage transaction = transactions[transactionCounter];
        transaction.id = transactionCounter;
        transaction.propertyId = _propertyId;
        transaction.buyer = msg.sender;
        transaction.seller = property.owner;
        transaction.amount = property.price;
        transaction.paymentToken = property.paymentToken;
        transaction.status = TransactionStatus.Created;
        transaction.createdAt = block.timestamp;
        transaction.completionDeadline = block.timestamp + 30 days;
        transaction.escrowAgent = _escrowAgent;
        
        userTransactions[msg.sender].push(transactionCounter);
        userTransactions[property.owner].push(transactionCounter);
        
        properties[_propertyId].status = PropertyStatus.UnderOffer;
        
        emit TransactionCreated(transactionCounter, _propertyId, msg.sender, property.price);
    }
    
    function fundTransaction(uint256 _transactionId) external {
        Transaction storage transaction = transactions[_transactionId];
        require(transaction.id != 0, "Transaction does not exist");
        require(transaction.buyer == msg.sender, "Only buyer can fund transaction");
        require(transaction.status == TransactionStatus.Created, "Invalid transaction status");
        
        IERC20 token = IERC20(transaction.paymentToken);
        uint256 totalAmount = transaction.amount + (transaction.amount * platformFeePercentage / 100);
        
        require(
            token.transferFrom(msg.sender, address(this), totalAmount),
            "Payment failed"
        );
        
        transaction.status = TransactionStatus.Funded;
        escrowedFunds[address(this)] += transaction.amount;
        
        emit TransactionFunded(_transactionId, msg.sender);
    }
    
    function completeTransaction(uint256 _transactionId) external {
        Transaction storage transaction = transactions[_transactionId];
        require(transaction.id != 0, "Transaction does not exist");
        require(
            msg.sender == transaction.buyer || msg.sender == transaction.seller,
            "Only buyer or seller can complete transaction"
        );
        require(transaction.status == TransactionStatus.Funded, "Transaction not funded");
        
        if (msg.sender == transaction.buyer) {
            transaction.buyerConfirmed = true;
        } else {
            transaction.sellerConfirmed = true;
        }
        
        if (transaction.buyerConfirmed && transaction.sellerConfirmed) {
            transaction.status = TransactionStatus.Completed;
            
            // Release funds to seller
            IERC20 token = IERC20(transaction.paymentToken);
            require(
                token.transfer(transaction.seller, transaction.amount),
                "Payment to seller failed"
            );
            
            // Update property status
            properties[transaction.propertyId].status = PropertyStatus.Sold;
            
            emit TransactionCompleted(_transactionId);
            emit EscrowReleased(_transactionId, transaction.seller, transaction.amount);
        }
    }
    
    // ==================== Dispute Functions ====================
    
    function createDispute(
        uint256 _transactionId,
        string memory _reason
    ) external {
        Transaction storage transaction = transactions[_transactionId];
        require(transaction.id != 0, "Transaction does not exist");
        require(
            msg.sender == transaction.buyer || msg.sender == transaction.seller,
            "Only buyer or seller can create dispute"
        );
        require(transaction.status != TransactionStatus.Completed, "Cannot dispute completed transaction");
        
        disputeCounter++;
        
        Dispute storage dispute = disputes[disputeCounter];
        dispute.id = disputeCounter;
        dispute.transactionId = _transactionId;
        dispute.initiator = msg.sender;
        dispute.reason = _reason;
        dispute.createdAt = block.timestamp;
        dispute.resolved = false;
        
        transaction.status = TransactionStatus.Disputed;
        
        emit DisputeCreated(disputeCounter, _transactionId);
    }
    
    function resolveDispute(
        uint256 _disputeId,
        address _winner
    ) external onlyArbitrator {
        Dispute storage dispute = disputes[_disputeId];
        require(dispute.id != 0, "Dispute does not exist");
        require(!dispute.resolved, "Dispute already resolved");
        
        Transaction storage transaction = transactions[dispute.transactionId];
        require(
            _winner == transaction.buyer || _winner == transaction.seller,
            "Invalid winner"
        );
        
        dispute.resolved = true;
        dispute.resolutionAgent = msg.sender;
        
        IERC20 token = IERC20(transaction.paymentToken);
        
        if (_winner == transaction.seller) {
            require(
                token.transfer(transaction.seller, transaction.amount),
                "Payment to seller failed"
            );
        } else {
            require(
                token.transfer(transaction.buyer, transaction.amount),
                "Refund to buyer failed"
            );
        }
        
        transaction.status = TransactionStatus.Resolved;
        
        emit DisputeResolved(_disputeId, msg.sender);
    }
    
    // ==================== Utility Functions ====================
    
    function getTransaction(uint256 _transactionId) external view returns (Transaction memory) {
        return transactions[_transactionId];
    }
    
    function getDispute(uint256 _disputeId) external view returns (Dispute memory) {
        return disputes[_disputeId];
    }
    
    function getUserProperties(address _user) external view returns (uint256[] memory) {
        return userProperties[_user];
    }
    
    function getUserTransactions(address _user) external view returns (uint256[] memory) {
        return userTransactions[_user];
    }
}
