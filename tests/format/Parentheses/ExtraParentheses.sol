// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract ExtraParentheses {
    function extraParentheses(bool a, bool b) public pure returns (bool) {
        return ((((((((a || b))))))));
    }
}
