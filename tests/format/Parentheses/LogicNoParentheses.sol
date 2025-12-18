// SPDX-License-Identifier: MIT
pragma solidity 0.8.32;

contract LogicNoParentheses {
    function orOr(bool a, bool b, bool c) public pure returns (bool) {
        return a || b || c;
    }

    function orAnd(bool a, bool b, bool c) public pure returns (bool) {
        return a || b && c;
    }

    function andOr(bool a, bool b, bool c) public pure returns (bool) {
        return a && b || c;
    }

    function andAnd(bool a, bool b, bool c) public pure returns (bool) {
        return a && b && c;
    }

    function equalEqual(bool a, bool b, bool c) public pure returns (bool) {
        return a == b == c;
    }

    function equalNotEqual(bool a, bool b, bool c) public pure returns (bool) {
        return a == b != c;
    }

    function notEqualEqual(bool a, bool b, bool c) public pure returns (bool) {
        return a != b == c;
    }

    function notEqualNotEqual(bool a, bool b, bool c) public pure returns (bool) {
        return a != b != c;
    }
}
