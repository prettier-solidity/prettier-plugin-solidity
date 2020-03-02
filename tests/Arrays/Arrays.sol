pragma solidity ^0.5.2;

contract Arrays {
    bytes32[] public permissions = [bytes32("addPartner"), bytes32("removePartner"), bytes32("addGroup"), bytes32("removeGroup"), bytes32("addUserToGroup"), bytes32("removeUserFromGroup"), bytes32("addSolution"), bytes32("removeSolution"), bytes32("addLibrary"), bytes32("removeLibrary"), bytes32("addPermissionToGroup"), bytes32("removePermissionFromGroup")];

    function a() {
    Outcome.OutcomeItem[] memory outcomeFrom = abi.decode(fromPart.outcome, (Outcome.OutcomeItem[]));
}
}
