pragma solidity ^0.4.24;


contract Comments1 {
  /* solhint-disable var-name-mixedcase */
IEIP712DomainSeparator private EIP712domainSeparator;
bytes32 private _CACHED_DOMAIN_SEPARATOR;


/* solhint-enable var-name-mixedcase */


    function() {
        // solhint-disable-previous-line no-empty-blocks
    }

    function hello() public modifier1 modifier2 modifier3 modifier4 modifier5 modifier6 {
        // solhint-disable-previous-line no-empty-blocks
    }
}


contract Comments2 {
    // solhint-disable-previous-line no-empty-blocks
}


contract Comments3 is Interface1, Interface2, Interface3, Interface4, Interface5, Interface6 {
  // solhint-disable-previous-line no-empty-blocks

  function someFunction() {

  }/*1*//*2
  */
}

contract Comments4 is Interface1, Interface2, Interface3, Interface4, Interface5, Interface6 {
  // solhint-disable-previous-line no-empty-blocks
}

contract Comments5 /*nice name*/ {
  // solhint-disable-previous-line no-empty-blocks
}

contract Comments6 /*why the name `Comments6`*/ is Interface1/*why we used Interface1*/, Interface2/*why we used Interface2*/, Interface3, Interface4, Interface5, Interface6 {
  // solhint-disable-previous-line no-empty-blocks
}

contract Comments7 {


  // 1 comment before first function



  // 2 comment before first function



  // 3 comment before first function

  function someFunction(
    uint a, // the first value
    uint b, // the second value
    uint c // the lats value
  ) {
    someFunction(
      a, // the first value
      b, // the second value
      c // the lats value
    );
  }
}

contract Comments8 {
  function someFunction() {
    if (something) {
    }
    // comment
    else {
    }
  }
}


contract Comments8 {
  function someFunction() {
    if (something) {
    }
    /* comment
     * comment */
    else {
    }
  }
}

contract Comments9 {
  function someFunction() {
    if (something) 
      // a comment
      f();
    else {
    }
  }
}

interface Comments10 {
  function someFunction(
    // the first value
    // the second value
    // the lats value
  ) /* comment outside the parameters */ external;

  function someOtherFunction(/* checking for Block comment */) external;
}

contract Comments11 {
  string a = "\\";
  string b = '\\';

  function f() public {
    // this should not be removed
  }
}

contract Comments12 {
  function f() public {
    purchaseData[0] = DomainPurchaseData({
      /* test */prices: _rootPrices,
      // test2
      subdomainMintingEnabled: /* test3 */_rootPrices.short > 0,
      allowSubdomainsToMint: true, // test4
      wasAllowedToSubdomainMintOnCreation: true
    });
  }
}

contract Comments13 {
  function commentInModifierInvocation() 
      external 
      // comment 1
      modifier1 // comment 2
      (
        // comment 3
      ) // comment 4
      // comment 5
      modifier2 // comment 6
      (
        /* comment 7 */
      ) // comment 8
      modifier3 // comment 9
      (
        // comment 10
        param1 // comment 11
        // comment 12
      ) // comment 13
      {
      while(true){ break/** comment 14 */; }
      while (true) { continue/** comment 15 */; }
  }
}