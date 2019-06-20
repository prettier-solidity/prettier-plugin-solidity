contract WhileStatements {
    uint constant LONG_VARIABLE = 1;

    function hi() public {
        uint a;
        uint veryLongVariableName;

        while (a < 100) a++;

        while (a < 200) a = a.add(LONG_VARIABLE).add(LONG_VARIABLE).add(LONG_VARIABLE);

        while (a < 300) { a++; }

        while (a < 400) { a = a.add(LONG_VARIABLE).add(LONG_VARIABLE).add(LONG_VARIABLE); }

        while (a < veryLongVariableName.add(LONG_VARIABLE).add(LONG_VARIABLE) * 500) a++;

        while (a < veryLongVariableName.add(LONG_VARIABLE).add(LONG_VARIABLE) * 600) { a++; }
    }
}
