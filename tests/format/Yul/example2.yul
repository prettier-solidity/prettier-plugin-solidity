{
      function power(base, exponent) -> result
     {
        result := 1 for { let i := 0 } lt(i, exponent) { i := add(i, 1) }
        {
            result    :=   mul(result,   base)
        }
    }
}