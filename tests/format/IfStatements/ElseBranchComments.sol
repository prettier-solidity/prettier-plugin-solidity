contract ElseBranchComments {
    function blockBody() public {
        if (a) {} else /* block comment */ if (b) { x; }

        if (a) {} else // end of line comment
        if (b) { x; }

        if (a) {} else
        // own line comment
        if (b) { x; }

        if (a) {} else /* empty body */ if (b) {}
    }

    function statementBody() public {
        if (a) {} else /* block comment */ if (b) x;

        if (a) {} else // end of line comment
        if (b) x;

        if (a) {} else
        // own line comment
        if (b) x; else y;
    }
}
