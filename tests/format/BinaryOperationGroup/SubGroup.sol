// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract SubGroup {
    function subAdd(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA - veryVeryVeryLongParameterB + veryVeryVeryLongParameterC;
    }

    function subSub(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA - veryVeryVeryLongParameterB - veryVeryVeryLongParameterC;
    }

    function subMul(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA - veryVeryVeryLongParameterB * veryVeryVeryLongParameterC;
    }

    function subDiv(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA - veryVeryVeryLongParameterB / veryVeryVeryLongParameterC;
    }

    function subMod(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA - veryVeryVeryLongParameterB % veryVeryVeryLongParameterC;
    }

    function subExp(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA - veryVeryVeryLongParameterB ** veryVeryVeryLongParameterC;
    }

    function subShiftL(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA - veryVeryVeryLongParameterB << veryVeryVeryLongParameterC;
    }

    function subShiftR(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA - veryVeryVeryLongParameterB >> veryVeryVeryLongParameterC;
    }

    function subBitAnd(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA - veryVeryVeryLongParameterB & veryVeryVeryLongParameterC;
    }

    function subBitOr(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA - veryVeryVeryLongParameterB | veryVeryVeryLongParameterC;
    }

    function subBitXor(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA - veryVeryVeryLongParameterB ^ veryVeryVeryLongParameterC;
    }

    function subEqual(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA - veryVeryVeryLongParameterB == veryVeryVeryLongParameterC;
    }

    function subNotEqual(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA - veryVeryVeryLongParameterB != veryVeryVeryLongParameterC;
    }
}