pragma solidity ^0.4.26;

contract Assembly {
  function assemblyLabels() {
  assembly {
    let n := calldataload(4)
    let a := 1
    let b := a
loop:
    jumpi(loopend, eq(n, 0))
    a add swap1
    n := sub(n, 1)
    jump(loop)

loopend:
    mstore(0, a)
    return(0, 0x20)
}

assembly{
    let x := 8
    jump(two)
    one:
        // Here the stack height is 2 (because we pushed x and 7),
        // but the assembler thinks it is 1 because it reads
        // from top to bottom.
        // Accessing the stack variable x here will lead to errors.
        x : = 9
        jump(three)
    two:
        7 // push something onto the stack
        jump(one)
    three:
}
}
}

contract MultipleAssemblyAssignment {
    function foo() public pure {
        assembly {
            function bar() -> a, b {
                a := 1
                b := 2
            }

            let i, j := bar()
        }
    }
}

contract AssemblyStackAssignment {
  function f() public {
    assembly {
      4 =: y
    }
  }
}
