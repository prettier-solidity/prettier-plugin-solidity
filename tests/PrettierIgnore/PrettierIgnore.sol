pragma solidity ^0.5.2;

contract PrettierIgnore {
    function() public payable {
        matrix(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        );

        // prettier-ignore
        matrix(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        );
    }
}
