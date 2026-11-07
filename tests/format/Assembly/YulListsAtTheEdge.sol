contract YulListsAtTheEdge {
  function f(uint x) {
    assembly {
      switch   x
      case 0 { mstore(0,   1) }
      default {   mstore(0, 2) } // trailing after switch

      let a,   b // trailing after names without a value


      let c :=   1
      switch c case 1 { a := 1 } /* trailing block comment */
      // prettier-ignore
      let   d,   e
      b   :=   c
    }
  }
}
