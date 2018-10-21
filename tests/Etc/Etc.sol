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

  function ifBlockInOneLine(uint a) returns (uint b) {
    if (a < 0) b = 0x67; else if (a == 0) b = 0x12; else b = 0x78;
  }
}
