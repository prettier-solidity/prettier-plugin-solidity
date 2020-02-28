interface FunctionInterfaces {
  function noParamsNoModifiersNoReturns();

  function oneParam(uint x);

  function oneModifier() modifier1;

  function oneReturn() returns(uint y1);

  function manyParams(uint x1, uint x2, uint x3, uint x4, uint x5, uint x6, uint x7, uint x8, uint x9, uint x10);

  function manyModifiers() modifier1 modifier2 modifier3 modifier4 modifier5 modifier6 modifier7 modifier8 modifier9 modifier10;

  function manyReturns() returns(uint y1, uint y2, uint y3, uint y4, uint y5, uint y6, uint y7, uint y8, uint y9, uint y10);

  function someParamsSomeModifiers(uint x1, uint x2, uint x3) modifier1 modifier2 modifier3;

  function someParamsSomeReturns(uint x1, uint x2, uint x3) returns(uint y1, uint y2, uint y3);

  function someModifiersSomeReturns() modifier1 modifier2 modifier3 returns(uint y1, uint y2, uint y3);

  function someParamSomeModifiersSomeReturns(uint x1, uint x2, uint x3) modifier1 modifier2 modifier3 returns(uint y1, uint y2, uint y3);

  function someParamsManyModifiers(uint x1, uint x2, uint x3) modifier1 modifier2 modifier3 modifier4 modifier5 modifier6 modifier7 modifier8 modifier9 modifier10;

  function someParamsManyReturns(uint x1, uint x2, uint x3) returns(uint y1, uint y2, uint y3, uint y4, uint y5, uint y6, uint y7, uint y8, uint y9, uint y10);

  function manyParamsSomeModifiers(uint x1, uint x2, uint x3, uint x4, uint x5, uint x6, uint x7, uint x8, uint x9, uint x10) modifier1 modifier2 modifier3;

  function manyParamssomeReturns(uint x1, uint x2, uint x3, uint x4, uint x5, uint x6, uint x7, uint x8, uint x9, uint x10) returns(uint y1, uint y2, uint y3);

  function manyParamsManyModifiers(uint x1, uint x2, uint x3, uint x4, uint x5, uint x6, uint x7, uint x8, uint x9, uint x10) modifier1 modifier2 modifier3 modifier4 modifier5 modifier6 modifier7 modifier8 modifier9 modifier10;

  function manyParamsManyReturns(uint x1, uint x2, uint x3, uint x4, uint x5, uint x6, uint x7, uint x8, uint x9, uint x10) returns(uint y1, uint y2, uint y3, uint y4, uint y5, uint y6, uint y7, uint y8, uint y9, uint y10);

  function manyParamsManyModifiersManyReturns(uint x1, uint x2, uint x3, uint x4, uint x5, uint x6, uint x7, uint x8, uint x9, uint x10) modifier1 modifier2 modifier3 modifier4 modifier5 modifier6 modifier7 modifier8 modifier9 modifier10 returns(uint y1, uint y2, uint y3, uint y4, uint y5, uint y6, uint y7, uint y8, uint y9, uint y10);
}

contract FunctionDefinitions {
  function () external {}
  fallback () external {}

  function () external payable {}
  fallback () external payable {}
  receive () external payable {}

  function noParamsNoModifiersNoReturns() {
    a = 1;
  }

  function oneParam(uint x) {
    a = 1;
  }

  function oneModifier() modifier1 {
    a = 1;
  }

  function oneReturn() returns(uint y1) {
    a = 1;
  }

  function manyParams(uint x1, uint x2, uint x3, uint x4, uint x5, uint x6, uint x7, uint x8, uint x9, uint x10) {
    a = 1;
  }

  function manyModifiers() modifier1 modifier2 modifier3 modifier4 modifier5 modifier6 modifier7 modifier8 modifier9 modifier10 {
    a = 1;
  }

  function manyReturns() returns(uint y1, uint y2, uint y3, uint y4, uint y5, uint y6, uint y7, uint y8, uint y9, uint y10) {
    a = 1;
  }

  function someParamsSomeModifiers(uint x1, uint x2, uint x3) modifier1 modifier2 modifier3 {
    a = 1;
  }

  function someParamsSomeReturns(uint x1, uint x2, uint x3) returns(uint y1, uint y2, uint y3) {
    a = 1;
  }

  function someModifiersSomeReturns() modifier1 modifier2 modifier3 returns(uint y1, uint y2, uint y3) {
    a = 1;
  }

  function someParamSomeModifiersSomeReturns(uint x1, uint x2, uint x3) modifier1 modifier2 modifier3 returns(uint y1, uint y2, uint y3) {
    a = 1;
  }

  function someParamsManyModifiers(uint x1, uint x2, uint x3) modifier1 modifier2 modifier3 modifier4 modifier5 modifier6 modifier7 modifier8 modifier9 modifier10 {
    a = 1;
  }

  function someParamsManyReturns(uint x1, uint x2, uint x3) returns(uint y1, uint y2, uint y3, uint y4, uint y5, uint y6, uint y7, uint y8, uint y9, uint y10) {
    a = 1;
  }

  function manyParamsSomeModifiers(uint x1, uint x2, uint x3, uint x4, uint x5, uint x6, uint x7, uint x8, uint x9, uint x10) modifier1 modifier2 modifier3 {
    a = 1;
  }

  function manyParamssomeReturns(uint x1, uint x2, uint x3, uint x4, uint x5, uint x6, uint x7, uint x8, uint x9, uint x10) returns(uint y1, uint y2, uint y3) {
    a = 1;
  }

  function manyParamsManyModifiers(uint x1, uint x2, uint x3, uint x4, uint x5, uint x6, uint x7, uint x8, uint x9, uint x10) modifier1 modifier2 modifier3 modifier4 modifier5 modifier6 modifier7 modifier8 modifier9 modifier10 public {
    a = 1;
  }

  function manyParamsManyReturns(uint x1, uint x2, uint x3, uint x4, uint x5, uint x6, uint x7, uint x8, uint x9, uint x10) returns(uint y1, uint y2, uint y3, uint y4, uint y5, uint y6, uint y7, uint y8, uint y9, uint y10) {
    a = 1;
  }

  function manyParamsManyModifiersManyReturns(uint x1, uint x2, uint x3, uint x4, uint x5, uint x6, uint x7, uint x8, uint x9, uint x10) modifier1 modifier2 modifier3 modifier4 modifier5 modifier6 modifier7 modifier8 modifier9 modifier10 returns(uint y1, uint y2, uint y3, uint y4, uint y5, uint y6, uint y7, uint y8, uint y9, uint y10) {
    a = 1;
  }
}
