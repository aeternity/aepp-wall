pragma solidity ^0.4.15;

contract ERC20 {
  function approveAndCall(address _spender, uint256 _value, bytes _extraData) returns (bool success);
  function transferFrom(address _from, address _to, uint256 _value) returns (bool success);
}

contract Wall {
  struct Like {
    address author;
    uint256 amount;
    uint createdAt;
  }

  struct Record {
    address author;
    string content;
    uint createdAt;
    Like[] likes;
  }

  Record[] public records;
  ERC20 tokenContract = ERC20(0x35d8830ea35e6Df033eEdb6d5045334A4e34f9f9);

  function store(string content) public {
    records.length += 1;
    Record storage r = records[records.length - 1];
    r.author = msg.sender;
    r.content = content;
    r.createdAt = now;
  }

  function like(uint recordId, uint256 amount) public {
    records[recordId].likes.push(Like({ author: msg.sender, amount: amount, createdAt: now }));
  }

  function receiveApproval(address from, uint256 value, address _tokenContract, bytes extraData) {
    require(address(tokenContract) == _tokenContract);
    require(address(tokenContract) == msg.sender);
    require(value > 0);
    uint256 recordId;
    assembly { recordId := mload(add(extraData, 32)) }
    Record storage r = records[recordId];
    require(tokenContract.transferFrom(from, r.author, value));
    r.likes.push(Like({ author: from, amount: value, createdAt: now }));
  }

  function recordCount() public constant returns (uint) {
    return records.length;
  }

  function recordLikeCount(uint recordId) public constant returns (uint) {
    return records[recordId].likes.length;
  }

  function recordLike(uint recordId, uint likeId) public constant returns (address, uint256, uint) {
    Like storage l = records[recordId].likes[likeId];
    return (l.author, l.amount, l.createdAt);
  }
}
