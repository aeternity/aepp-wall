pragma solidity ^0.4.4;

contract AeternityWall {
	event Stored();

	function store(string key, string value) {
		Stored();
	}
}
