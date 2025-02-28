// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract ModGroup {
    function modAdd(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA % veryVeryVeryLongParameterB + veryVeryVeryLongParameterC;
    }

    function modSub(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA % veryVeryVeryLongParameterB - veryVeryVeryLongParameterC;
    }

    function modMul(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA % veryVeryVeryLongParameterB * veryVeryVeryLongParameterC;
    }

    function modDiv(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA % veryVeryVeryLongParameterB / veryVeryVeryLongParameterC;
    }

    function modMod(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA % veryVeryVeryLongParameterB % veryVeryVeryLongParameterC;
    }

    function modExp(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA % veryVeryVeryLongParameterB ** veryVeryVeryLongParameterC;
    }

    function modShiftL(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA % veryVeryVeryLongParameterB << veryVeryVeryLongParameterC;
    }

    function modShiftR(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA % veryVeryVeryLongParameterB >> veryVeryVeryLongParameterC;
    }

    function modBitAnd(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA % veryVeryVeryLongParameterB & veryVeryVeryLongParameterC;
    }

    function modBitOr(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA % veryVeryVeryLongParameterB | veryVeryVeryLongParameterC;
    }

    function modBitXor(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA % veryVeryVeryLongParameterB ^ veryVeryVeryLongParameterC;
    }

    function modEqual(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA % veryVeryVeryLongParameterB == veryVeryVeryLongParameterC;
    }

    function modNotEqual(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA % veryVeryVeryLongParameterB != veryVeryVeryLongParameterC;
    }
}
