pragma solidity ^0.5.2;

contract PrettierIgnore {
    fallback() external payable {
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
    fallback() external payable {        
        // This should be marked as printed
        // Everything inside is also ignored
        matrix(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        );
        // Comments for members of an Array are marked as printed
        if (true)
            // Comments of single child Objects are marked as printed
            return;
        else
            // Comments of children should be marked as printed
            return;
    }
}
