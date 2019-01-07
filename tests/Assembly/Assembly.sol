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
}
