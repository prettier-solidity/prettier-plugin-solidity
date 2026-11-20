contract WhileStatementComments {
    function condition() public {
        while (/* before condition */ a) { x; }

        while (a /* after condition */) { x; }

        while (a // end of line comment
        ) { x; }
    }

    function blockBody() public {
        while (a) /* block comment */ { x; }

        while (a) // end of line comment
        { x; }

        while (a)
        // own line comment
        { x; }

        while (a) /* empty body */ {}
    }

    function statementBody() public {
        while (a) /* block comment */ x;

        while (a) // end of line comment
        x;

        while (a)
        // own line comment
        x;
    }
}
