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

  function assemblyFunctionLongReturnParameters() {
		assembly {
			function sum  (a, b, c, d, e)
      -> thisIs, aFunctionWithVery, veryLongParameterNames, andItAlsoHasALotOfParameters, soItShouldBeSplitInMultipleLines {
        thisIs := 0
        aFunctionWithVery := 0
        veryLongParameterNames := 0
        andItAlsoHasALotOfParameters := 0
        soItShouldBeSplitInMultipleLines := 0
			}
  		}
  }


    function assemblyFunctionLongParametersAndReturnParameters() {
  		assembly {
  			function sum  (a,veryLong, listof, parameters, thatShould,splitForSure)
        -> thisIs, aFunctionWithVery, veryLongParameterNames, andItAlsoHasALotOfParameters, soItShouldBeSplitInMultipleLines {
          thisIs := 0
          aFunctionWithVery := 0
          veryLongParameterNames := 0
          andItAlsoHasALotOfParameters := 0
          soItShouldBeSplitInMultipleLines := 0
  			}
    		}
    }

    function assemblyNoParameterCalls() {
        assembly {
            call(gas(), to, value, inputData, inputDataSize, 0, 0)
        }
    }

  function assemblyFunctionNoReturn () {

    assembly {

function $somefn(somearg) {
}
    }
  }

    function   letWithoutValue ( ) {

       assembly {   let result   }
  }

    function   memberAccess ( ) {

       assembly {  
          ds.slot   :=   position
          offset   :=   x.offset
       }
  }

  function commentsInAssemblyBlock () {

       assembly {  
                 /* foo bar baz */
                 /* foobbbbbb */
       }
  }

  function withBreak() {
    assembly {
            for {} 1 {} {
                break
            }
        }
  }

  function memorySafe() {
    assembly ("memory-safe") {
    }
    assembly "evmasm" ("memory-safe") {
    }
  }

function continueAndBreak(uint256 x) public pure returns (uint a, uint b){
assembly {
for { let i := 0 } lt(i, x) { i := add(i, 1) } {
            if lt(i, 10) { 
                    a := add(a, i)
                    continue
                }
                if eq(i, 15) {
                    break
                }

                b := i
        }
}
}
}

contract BooleanLiteralsInAssembly {
  function f() {
    uint a;
    assembly {
      a := true
      a := false
    }
  }
}
