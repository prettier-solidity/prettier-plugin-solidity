contract Assembly {
  function ifAssembly() {
    assembly {
      if
        returndatasize    {
          success := 0
      }
    }
  }
}
