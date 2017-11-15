pragma solidity ^0.4.15;

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
