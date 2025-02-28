// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract LogicIndentation {
    function orOr(bool veryVeryVeryExtremelyExtremelyLongParameterA, bool veryVeryVeryExtremelyExtremelyLongParameterB, bool veryVeryVeryExtremelyExtremelyLongParameterC) public pure returns (bool) {
        return veryVeryVeryExtremelyExtremelyLongParameterA || veryVeryVeryExtremelyExtremelyLongParameterB || veryVeryVeryExtremelyExtremelyLongParameterC;
    }

    function orAnd(bool veryVeryVeryExtremelyExtremelyLongParameterA, bool veryVeryVeryExtremelyExtremelyLongParameterB, bool veryVeryVeryExtremelyExtremelyLongParameterC) public pure returns (bool) {
        return veryVeryVeryExtremelyExtremelyLongParameterA || veryVeryVeryExtremelyExtremelyLongParameterB && veryVeryVeryExtremelyExtremelyLongParameterC;
    }

    function orEqual(bool veryVeryVeryExtremelyExtremelyLongParameterA, bool veryVeryVeryExtremelyExtremelyLongParameterB, bool veryVeryVeryExtremelyExtremelyLongParameterC) public pure returns (bool) {
        return veryVeryVeryExtremelyExtremelyLongParameterA || veryVeryVeryExtremelyExtremelyLongParameterB == veryVeryVeryExtremelyExtremelyLongParameterC;
    }

    function orNotEqual(bool veryVeryVeryExtremelyExtremelyLongParameterA, bool veryVeryVeryExtremelyExtremelyLongParameterB, bool veryVeryVeryExtremelyExtremelyLongParameterC) public pure returns (bool) {
        return veryVeryVeryExtremelyExtremelyLongParameterA || veryVeryVeryExtremelyExtremelyLongParameterB != veryVeryVeryExtremelyExtremelyLongParameterC;
    }

    function andOr(bool veryVeryVeryExtremelyExtremelyLongParameterA, bool veryVeryVeryExtremelyExtremelyLongParameterB, bool veryVeryVeryExtremelyExtremelyLongParameterC) public pure returns (bool) {
        return veryVeryVeryExtremelyExtremelyLongParameterA && veryVeryVeryExtremelyExtremelyLongParameterB || veryVeryVeryExtremelyExtremelyLongParameterC;
    }

    function andAnd(bool veryVeryVeryExtremelyExtremelyLongParameterA, bool veryVeryVeryExtremelyExtremelyLongParameterB, bool veryVeryVeryExtremelyExtremelyLongParameterC) public pure returns (bool) {
        return veryVeryVeryExtremelyExtremelyLongParameterA && veryVeryVeryExtremelyExtremelyLongParameterB && veryVeryVeryExtremelyExtremelyLongParameterC;
    }

    function andEqual(bool veryVeryVeryExtremelyExtremelyLongParameterA, bool veryVeryVeryExtremelyExtremelyLongParameterB, bool veryVeryVeryExtremelyExtremelyLongParameterC) public pure returns (bool) {
        return veryVeryVeryExtremelyExtremelyLongParameterA && veryVeryVeryExtremelyExtremelyLongParameterB == veryVeryVeryExtremelyExtremelyLongParameterC;
    }

    function andNotEqual(bool veryVeryVeryExtremelyExtremelyLongParameterA, bool veryVeryVeryExtremelyExtremelyLongParameterB, bool veryVeryVeryExtremelyExtremelyLongParameterC) public pure returns (bool) {
        return veryVeryVeryExtremelyExtremelyLongParameterA && veryVeryVeryExtremelyExtremelyLongParameterB != veryVeryVeryExtremelyExtremelyLongParameterC;
    }
}
