contract Assembly {
  function ifAssembly() {
    assembly {
      if
        returndatasize    {
          success := 0
      }
    }
  }

  function caseAssembly() {
    assembly {
          switch value
            case 0 {
              mstore(0, 0x0000000000000000000000000000000000000000000000000000000000000000)
            }
            case 1 {
                mstore(0, 0x1111111111111111111111111111111111111111111111111111111111111111)
            }
        }
  }

  function forAssembly() {
    assembly {
for { let i := 0 } lt(i, x) { i := add(i, 1) } { y := mul(2, y) }
        }
  }

  function callWithComments() {
    assembly {
      f(
        1, // one
        2, // two
        3 // three
      )
    }
  }

  function assemblyFunctionNoParameters() {
		assembly {
			function getAnswer  ()
      -> answer {
          answer:=    42
			}
  		}
  }

  function assemblyFunctionOneParameter() {
		assembly {
			function inc  (x)
      -> result {
          result := add(x,
                        1)
			}
  		}
  }

  function assemblyFunctionThreeParameters() {
		assembly {
			function sum  (a, b, c)
      -> result {
          result := add(a,
                        add(b, c))
			}
  		}
  }

  function assemblyFunctionLongParameters() {
		assembly {
			function sum  (thisIs, aFunctionWithVery, veryLongParameterNames, andItAlsoHasALotOfParameters, soItShouldBeSplitInMultipleLines)
      -> result {
        result := 0
			}
  		}
  }
}
