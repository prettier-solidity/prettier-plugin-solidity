// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract EqualParentheses {
    function notEqualAdd(uint256 a, uint256 b, uint256 c)
        public
        pure
        returns (bool)
    {
        return a == b + c;
    }

    function notEqualSub(uint256 a, uint256 b, uint256 c)
        public
        pure
        returns (bool)
    {
        return a == b - c;
    }

    function notEqualMul(uint256 a, uint256 b, uint256 c)
        public
        pure
        returns (bool)
    {
        return a == b * c;
    }

    function notEqualDiv(uint256 a, uint256 b, uint256 c)
        public
        pure
        returns (bool)
    {
        return a == b / c;
    }

    function notEqualMod(uint256 a, uint256 b, uint256 c)
        public
        pure
        returns (bool)
    {
        return a == b % c;
    }

    function notEqualExp(uint256 a, uint256 b, uint256 c)
        public
        pure
        returns (bool)
    {
        return a == b ** c;
    }

    function notEqualShiftL(uint256 a, uint256 b, uint256 c)
        public
        pure
        returns (bool)
    {
        return a == b << c;
    }

    function notEqualShiftR(uint256 a, uint256 b, uint256 c)
        public
        pure
        returns (bool)
    {
        return a == b >> c;
    }

    function notEqualBitAnd(uint256 a, uint256 b, uint256 c)
        public
        pure
        returns (bool)
    {
        return a == b & c;
    }

    function notEqualBitOr(uint256 a, uint256 b, uint256 c)
        public
        pure
        returns (bool)
    {
        return a == b | c;
    }

    function notEqualBitXor(uint256 a, uint256 b, uint256 c)
        public
        pure
        returns (bool)
    {
        return a == b ^ c;
    }

    function notEqualEqual(bool a, bool b, bool c)
        public
        pure
        returns (bool)
    {
        return a == b == c;
    }

    function notEqualNotEqual(bool a, bool b, bool c)
        public
        pure
        returns (bool)
    {
        return a == b != c;
    }
}