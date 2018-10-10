pragma solidity ^0.4.24;

// line comment

/*
	Block comment
*/

contract Contract {
  modifier modifierWithoutParams() {
    require(msg.sender != address(0));
    _;
  }

  modifier modifierWithParams(address x) {
    require(msg.sender != x);
    _;
  }
}
