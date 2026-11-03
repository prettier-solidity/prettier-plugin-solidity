pragma solidity ^0.8.0;

contract DanglingComments {
    struct Pending {
        // fields will be added later
    }

    struct PendingToo {   /* fields will be added later */   }

    function reserved(
        // parameters will be added later
    ) public {}

    function reservedToo(   // first
        // second

        // third
    ) public {}

    function caller() public {
        reserved(
            // nothing to pass yet
        );
        reserved(  /* nothing to pass yet */  );
    }

    function lastYulComment() public {
        assembly {
            let x := 1 // trailing


            // last
        }
        assembly {
            let y := 2
            /* last */ }
    }
}
