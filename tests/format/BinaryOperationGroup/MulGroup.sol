// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract MulGroup {
    function mulAdd(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA * veryVeryVeryLongParameterB + veryVeryVeryLongParameterC;
    }

    function mulSub(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA * veryVeryVeryLongParameterB - veryVeryVeryLongParameterC;
    }

    function mulMul(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA * veryVeryVeryLongParameterB * veryVeryVeryLongParameterC;
    }

    function mulDiv(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA * veryVeryVeryLongParameterB / veryVeryVeryLongParameterC;
    }

    function mulMod(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA * veryVeryVeryLongParameterB % veryVeryVeryLongParameterC;
    }

    function mulExp(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA * veryVeryVeryLongParameterB ** veryVeryVeryLongParameterC;
    }

    function mulShiftL(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA * veryVeryVeryLongParameterB << veryVeryVeryLongParameterC;
    }

    function mulShiftR(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA * veryVeryVeryLongParameterB >> veryVeryVeryLongParameterC;
    }

    function mulBitAnd(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA * veryVeryVeryLongParameterB & veryVeryVeryLongParameterC;
    }

    function mulBitOr(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA * veryVeryVeryLongParameterB | veryVeryVeryLongParameterC;
    }

    function mulBitXor(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA * veryVeryVeryLongParameterB ^ veryVeryVeryLongParameterC;
    }

    function mulEqual(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA * veryVeryVeryLongParameterB == veryVeryVeryLongParameterC;
    }

    function mulNotEqual(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA * veryVeryVeryLongParameterB != veryVeryVeryLongParameterC;
    }
}
