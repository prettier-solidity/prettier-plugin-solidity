contract FunctionCalls {
    function foo() {
        address veryLongValidatorAddress = veryVeryVeryLongSignature.popLast20Bytes();
    }

    function foo() {
      Voter you = Voter(1, true);

      Voter me = Voter({
          weight: 2,
          voted: abstain()
      });

      Voter airbnb = Voter({
        weight: 2,
        voted: true,
      });
    }
}
