// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract LogicGroup {
    function orOr(bool veryVeryVeryLongParameterA, bool veryVeryVeryLongParameterB, bool veryVeryVeryLongParameterC) public pure returns (bool) {
        return veryVeryVeryLongParameterA || veryVeryVeryLongParameterB || veryVeryVeryLongParameterC;
    }

    function orAnd(bool veryVeryVeryLongParameterA, bool veryVeryVeryLongParameterB, bool veryVeryVeryLongParameterC) public pure returns (bool) {
        return veryVeryVeryLongParameterA || veryVeryVeryLongParameterB && veryVeryVeryLongParameterC;
    }

    function orEqual(bool veryVeryVeryLongParameterA, bool veryVeryVeryLongParameterB, bool veryVeryVeryLongParameterC) public pure returns (bool) {
        return veryVeryVeryLongParameterA || veryVeryVeryLongParameterB == veryVeryVeryLongParameterC;
    }

    function orNotEqual(bool veryVeryVeryLongParameterA, bool veryVeryVeryLongParameterB, bool veryVeryVeryLongParameterC) public pure returns (bool) {
        return veryVeryVeryLongParameterA || veryVeryVeryLongParameterB != veryVeryVeryLongParameterC;
    }

    function andOr(bool veryVeryVeryLongParameterA, bool veryVeryVeryLongParameterB, bool veryVeryVeryLongParameterC) public pure returns (bool) {
        return veryVeryVeryLongParameterA && veryVeryVeryLongParameterB || veryVeryVeryLongParameterC;
    }

    function andAnd(bool veryVeryVeryLongParameterA, bool veryVeryVeryLongParameterB, bool veryVeryVeryLongParameterC) public pure returns (bool) {
        return veryVeryVeryLongParameterA && veryVeryVeryLongParameterB && veryVeryVeryLongParameterC;
    }

    function andEqual(bool veryVeryVeryLongParameterA, bool veryVeryVeryLongParameterB, bool veryVeryVeryLongParameterC) public pure returns (bool) {
        return veryVeryVeryLongParameterA && veryVeryVeryLongParameterB == veryVeryVeryLongParameterC;
    }

    function andNotEqual(bool veryVeryVeryLongParameterA, bool veryVeryVeryLongParameterB, bool veryVeryVeryLongParameterC) public pure returns (bool) {
        return veryVeryVeryLongParameterA && veryVeryVeryLongParameterB != veryVeryVeryLongParameterC;
    }
}
