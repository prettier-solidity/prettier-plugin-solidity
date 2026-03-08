// SPDX-License-Identifier: MIT
pragma solidity 0.4.26;

contract ModifierDefinitions {
  // We enforce the use of parentheses in modifiers without parameters.
  modifier emptyParams {_;}
  modifier noParams() {_;}
}

contract ModifierInvocations is ModifierDefinitions {
  // We can't differentiate between constructor calls or modifiers, so we keep
  // parentheses untouched in constructors.
  function ModifierInvocations () emptyParams noParams() ModifierDefinitions() {}

  // We remove parentheses in modifiers without arguments.
  function test() public emptyParams noParams() {}
}

library ModifierInvocationsLibrary {
  // We enforce the use of parentheses in modifiers without parameters.
  modifier emptyParams {_;}
  modifier noParams() {_;}

  modifier nonZero (uint x) {
    require (x != 0);
    _;
  }

  function isPrime (uint x) public nonZero (x) returns (bool) {
    // Complicated logic here
  }

  // We remove parentheses in modifiers without arguments.
  function test() public emptyParams noParams() {}
}
