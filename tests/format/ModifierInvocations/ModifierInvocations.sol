// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

contract ModifierDefinitions {
  modifier emptyParams {_;}
  modifier noParams() {_;}
  modifier oneParam(uint a) {_;}
}

contract ModifierInvocations is ModifierDefinitions {
  constructor () emptyParams noParams() ModifierDefinitions() {}
  function test() public emptyParams noParams() oneParam(5) {}
}
