// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract ExpGroup {
    function expAdd(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA ** veryVeryVeryLongParameterB + veryVeryVeryLongParameterC;
    }

    function expSub(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA ** veryVeryVeryLongParameterB - veryVeryVeryLongParameterC;
    }

    function expMul(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA ** veryVeryVeryLongParameterB * veryVeryVeryLongParameterC;
    }

    function expDiv(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA ** veryVeryVeryLongParameterB / veryVeryVeryLongParameterC;
    }

    function expMod(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA ** veryVeryVeryLongParameterB % veryVeryVeryLongParameterC;
    }

    function expExp(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA ** veryVeryVeryLongParameterB ** veryVeryVeryLongParameterC;
    }

    function expShiftL(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA ** veryVeryVeryLongParameterB << veryVeryVeryLongParameterC;
    }

    function expShiftR(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA ** veryVeryVeryLongParameterB >> veryVeryVeryLongParameterC;
    }

    function expBitAnd(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA ** veryVeryVeryLongParameterB & veryVeryVeryLongParameterC;
    }

    function expBitOr(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA ** veryVeryVeryLongParameterB | veryVeryVeryLongParameterC;
    }

    function expBitXor(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (uint256)
    {
        return veryVeryVeryLongParameterA ** veryVeryVeryLongParameterB ^ veryVeryVeryLongParameterC;
    }

    function expEqual(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA ** veryVeryVeryLongParameterB == veryVeryVeryLongParameterC;
    }

    function expNotEqual(uint256 veryVeryVeryLongParameterA, uint256 veryVeryVeryLongParameterB, uint256 veryVeryVeryLongParameterC)
        public
        pure
        returns (bool)
    {
        return veryVeryVeryLongParameterA ** veryVeryVeryLongParameterB != veryVeryVeryLongParameterC;
    }
}
