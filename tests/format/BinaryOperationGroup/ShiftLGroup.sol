// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract ShiftLGroup {
    function shiftLAdd(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA << veryVeryVeryLongParameterB + veryVeryVeryLongParameterC;
    }

    function shiftLSub(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA << veryVeryVeryLongParameterB - veryVeryVeryLongParameterC;
    }

    function shiftLMul(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA << veryVeryVeryLongParameterB * veryVeryVeryLongParameterC;
    }

    function shiftLDiv(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA << veryVeryVeryLongParameterB / veryVeryVeryLongParameterC;
    }

    function shiftLMod(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA << veryVeryVeryLongParameterB % veryVeryVeryLongParameterC;
    }

    function shiftLExp(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA << veryVeryVeryLongParameterB ** veryVeryVeryLongParameterC;
    }

    function shiftLShiftL(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA << veryVeryVeryLongParameterB << veryVeryVeryLongParameterC;
    }

    function shiftLShiftR(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA << veryVeryVeryLongParameterB >> veryVeryVeryLongParameterC;
    }

    function shiftLBitAnd(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA << veryVeryVeryLongParameterB & veryVeryVeryLongParameterC;
    }

    function shiftLBitOr(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA << veryVeryVeryLongParameterB | veryVeryVeryLongParameterC;
    }

    function shiftLBitXor(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA << veryVeryVeryLongParameterB ^ veryVeryVeryLongParameterC;
    }

    function shiftLEqual(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA << veryVeryVeryLongParameterB == veryVeryVeryLongParameterC;
    }

    function shiftLNotEqual(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA << veryVeryVeryLongParameterB != veryVeryVeryLongParameterC;
    }
}
