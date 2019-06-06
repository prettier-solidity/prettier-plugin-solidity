contract FunctionCalls {
    function foo() {
        address veryLongValidatorAddress = veryVeryVeryLongSignature.popLast20Bytes();
    }
}
