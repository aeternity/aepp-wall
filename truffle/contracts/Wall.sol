pragma solidity ^0.4.15;

contract Wall {
  event Store(address indexed account, string content, uint createdAt);
  event Like(address indexed account, bytes32 indexed transactionHash, uint256 amount, uint createdAt);

  function store(string content) public {
    Store(msg.sender, content, now);
  }

  function like(bytes32 transactionHash, uint256 amount) public {
    Like(msg.sender, transactionHash, amount, now);
  }
}
