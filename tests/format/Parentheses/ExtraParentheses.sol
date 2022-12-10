// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract ExtraParentheses {
    function returnParentheses(bool a, bool b) public pure returns (bool) {
        return ((((((((a || b))))))));
    }

    function doubleReturnParentheses(bool a, bool b) public pure returns (bool, bool) {
        return ((((((((a || b)))),(a&&b)))));
    }

    function functionCallParentheses(bool a, bool b) public pure returns (bool) {
        functionCallParentheses((((((((a || b))))))), (((((((a && b))))))));   
    }

    function decode(bytes memory data) public pure returns (uint _number, string memory str) {
        _number = abi.decode(data, ((uint)));
        (_number, str) = abi.decode(data, (uint, string));
    }
}
