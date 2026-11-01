// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FunctionTypeVisibility {
    function target(uint256) external pure {}

    // The first visibility belongs to the function type, the second one to the
    // state variable.
    function(uint256) external public externalPublic;
    function(uint256) external internal externalInternal = this.target;

    // The function type's attributes end at the second visibility, so `view`
    // can't move after `public`.
    function(uint256) view external public viewExternalPublic;

    // A single visibility is still sorted before the mutability.
    function(uint256) pure internal pureInternal;
}
