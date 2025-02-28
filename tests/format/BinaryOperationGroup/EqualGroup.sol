// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract EqualGroup {
    function equalAdd(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA == veryVeryVeryLongParameterB + veryVeryVeryLongParameterC;
    }

    function equalSub(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA == veryVeryVeryLongParameterB - veryVeryVeryLongParameterC;
    }

    function equalMul(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA == veryVeryVeryLongParameterB * veryVeryVeryLongParameterC;
    }

    function equalDiv(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA == veryVeryVeryLongParameterB / veryVeryVeryLongParameterC;
    }

    function equalMod(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA == veryVeryVeryLongParameterB % veryVeryVeryLongParameterC;
    }

    function equalExp(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA == veryVeryVeryLongParameterB ** veryVeryVeryLongParameterC;
    }

    function equalShiftL(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA == veryVeryVeryLongParameterB << veryVeryVeryLongParameterC;
    }

    function equalShiftR(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA == veryVeryVeryLongParameterB >> veryVeryVeryLongParameterC;
    }

    function equalBitAnd(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA == veryVeryVeryLongParameterB & veryVeryVeryLongParameterC;
    }

    function equalBitOr(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA == veryVeryVeryLongParameterB | veryVeryVeryLongParameterC;
    }

    function equalBitXor(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA == veryVeryVeryLongParameterB ^ veryVeryVeryLongParameterC;
    }

    function equalEqual(bool veryVeryVeryLongParameterA, bool veryVeryVeryLongParameterB, bool veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA == veryVeryVeryLongParameterB == veryVeryVeryLongParameterC;
    }

    function equalNotEqual(bool veryVeryVeryLongParameterA, bool veryVeryVeryLongParameterB, bool veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA == veryVeryVeryLongParameterB != veryVeryVeryLongParameterC;
    }
}