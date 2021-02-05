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

// prettier-ignore
contract Example {
// Test comment
    function() public payable {        
        // this should be marked as printed
        // Everything inside is also ignored
        matrix(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        );
        if (true) {
            // comments of children should be marked as printed
        }
    }
}
