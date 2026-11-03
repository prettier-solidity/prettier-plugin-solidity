pragma solidity ^0.8.0;

contract TupleDeconstructionEmptyLastSlot {
    function fits() public view returns (uint) {
        (uint first, ) = pair();
        return first;
    }

    function breaks() public view returns (uint) {
        (uint256 someVeryLongVariableName, uint256 anotherVeryLongVariableName, ) = values();
        return someVeryLongVariableName + anotherVeryLongVariableName;
    }

    function breaksWithTwoEmptySlots() public view returns (uint) {
        (uint256 someVeryLongVariableName, uint256 anotherVeryLongVariableName, , ) = values();
        return someVeryLongVariableName + anotherVeryLongVariableName;
    }

    function lineCommentAfterComma() public view returns (uint) {
        (uint first, // the second value is ignored
        ) = pair();
        return first;
    }

    function onlyEmptySlots() public view {
        () = nothing();
        (, ) = pair();
    }
}
