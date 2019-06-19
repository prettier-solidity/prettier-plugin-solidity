contract ArithmeticOperators {
  // ['+', '-', '*', '/', '%', '**']
  function someFunction() {
    a + b;
    a - b;
    a * b;
    a / b;
    a % b;
    a ** b;
    a % b + c - d * e / f ** g;
    veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongVariableCalledB;
    veryVeryVeryVeryVeryLongVariableCalledA - veryVeryVeryVeryVeryLongVariableCalledB;
    veryVeryVeryVeryVeryLongVariableCalledA * veryVeryVeryVeryVeryLongVariableCalledB;
    veryVeryVeryVeryVeryLongVariableCalledA / veryVeryVeryVeryVeryLongVariableCalledB;
    veryVeryVeryVeryVeryLongVariableCalledA % veryVeryVeryVeryVeryLongVariableCalledB;
    veryVeryVeryVeryVeryLongVariableCalledA ** veryVeryVeryVeryVeryLongVariableCalledB;
    veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongVariableCalledB - c * d / e % f ** g;
    a = veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongVariableCalledB;
    if (veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongVariableCalledB == a()) {}
    if (a() == veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongVariableCalledB) {}
    for (a = veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongVariableCalledB; a <= veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongVariableCalledB; a += veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongVariableCalledB) {}
    a(veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongVariableCalledB);
    return veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongVariableCalledB;
  }
}


contract ShiftOperators {
  // ['<<', '>>']
  function someFunction() {
    a << b;
    a >> b;
    veryVeryVeryVeryVeryLongVariableCalledA << veryVeryVeryVeryVeryLongVariableCalledB;
    veryVeryVeryVeryVeryLongVariableCalledA >> veryVeryVeryVeryVeryLongVariableCalledB;
    a = veryVeryVeryVeryVeryLongVariableCalledA << veryVeryVeryVeryVeryLongVariableCalledB;
    if (veryVeryVeryVeryVeryLongVariableCalledA << veryVeryVeryVeryVeryLongVariableCalledB == a()) {}
    if (a() == veryVeryVeryVeryVeryLongVariableCalledA << veryVeryVeryVeryVeryLongVariableCalledB) {}
    a(veryVeryVeryVeryVeryLongVariableCalledA << veryVeryVeryVeryVeryLongVariableCalledB);
    return veryVeryVeryVeryVeryLongVariableCalledA << veryVeryVeryVeryVeryLongVariableCalledB;
  }
}


contract BitOperators {
  // ['&', '|', '^']
  function someFunction() {
    a & b;
    a | b;
    a ^ b;
    veryVeryVeryVeryVeryLongVariableCalledA & veryVeryVeryVeryVeryLongVariableCalledB;
    veryVeryVeryVeryVeryLongVariableCalledA | veryVeryVeryVeryVeryLongVariableCalledB;
    veryVeryVeryVeryVeryLongVariableCalledA ^ veryVeryVeryVeryVeryLongVariableCalledB;
    a = veryVeryVeryVeryVeryLongVariableCalledA & veryVeryVeryVeryVeryLongVariableCalledB;
    if (veryVeryVeryVeryVeryLongVariableCalledA & veryVeryVeryVeryVeryLongVariableCalledB == a()) {}
    if (a() == veryVeryVeryVeryVeryLongVariableCalledA & veryVeryVeryVeryVeryLongVariableCalledB) {}
    a(veryVeryVeryVeryVeryLongVariableCalledA & veryVeryVeryVeryVeryLongVariableCalledB);
    return veryVeryVeryVeryVeryLongVariableCalledA & veryVeryVeryVeryVeryLongVariableCalledB;
  }
}


contract ComparisonOperators {
  // ['<', '>', '<=', '>=', '==', '!=']
  function someFunction() {
    a < b;
    a > b;
    a <= b;
    a >= b;
    a == b;
    a != b;
    veryVeryVeryVeryVeryLongVariableCalledA < veryVeryVeryVeryVeryLongVariableCalledB;
    veryVeryVeryVeryVeryLongVariableCalledA > veryVeryVeryVeryVeryLongVariableCalledB;
    veryVeryVeryVeryVeryLongVariableCalledA <= veryVeryVeryVeryVeryLongVariableCalledB;
    veryVeryVeryVeryVeryLongVariableCalledA >= veryVeryVeryVeryVeryLongVariableCalledB;
    veryVeryVeryVeryVeryLongVariableCalledA == veryVeryVeryVeryVeryLongVariableCalledB;
    veryVeryVeryVeryVeryLongVariableCalledA != veryVeryVeryVeryVeryLongVariableCalledB;
    a = veryVeryVeryVeryVeryLongVariableCalledA < veryVeryVeryVeryVeryLongVariableCalledB;
    if (veryVeryVeryVeryVeryLongVariableCalledA > veryVeryVeryVeryVeryLongFunctionB()) {}
    if (veryVeryVeryVeryVeryLongFunctionB() <= veryVeryVeryVeryVeryLongVariableCalledA) {}
    while (veryVeryVeryVeryVeryLongVariableCalledA != veryVeryVeryVeryVeryLongFunctionB()) {}
    while (veryVeryVeryVeryVeryLongFunctionB() == veryVeryVeryVeryVeryLongVariableCalledA) {}
    for (a = veryVeryVeryVeryVeryLongVariableCalledA; veryVeryVeryVeryVeryLongVariableCalledB >= veryVeryVeryVeryVeryLongVariableCalledA; a += veryVeryVeryVeryVeryLongVariableCalledA || veryVeryVeryVeryVeryLongVariableCalledB ? 1:2) {}
    a(veryVeryVeryVeryVeryLongVariableCalledA == veryVeryVeryVeryVeryLongVariableCalledB);
    return veryVeryVeryVeryVeryLongVariableCalledA == veryVeryVeryVeryVeryLongVariableCalledB;
  }
}


contract AssignmentOperators {
  // ['=', '|=', '^=', '&=', '<<=', '>>=', '+=', '-=', '*=', '/=', '%=']
  function someFunction() {
    a = veryVeryVeryVeryVeryLongVariableCalledA;
    a |= veryVeryVeryVeryVeryLongVariableCalledA;
    a ^= veryVeryVeryVeryVeryLongVariableCalledA;
    a &= veryVeryVeryVeryVeryLongVariableCalledA;
    a <<= veryVeryVeryVeryVeryLongVariableCalledA;
    a >>= veryVeryVeryVeryVeryLongVariableCalledA;
    a += veryVeryVeryVeryVeryLongVariableCalledA;
    a -= veryVeryVeryVeryVeryLongVariableCalledA;
    a *= veryVeryVeryVeryVeryLongVariableCalledA;
    a /= veryVeryVeryVeryVeryLongVariableCalledA;
    a %= veryVeryVeryVeryVeryLongVariableCalledA;
    a = veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongFunctionCalledB(c);
    a |= veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongFunctionCalledB(c);
    a ^= veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongFunctionCalledB(c);
    a &= veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongFunctionCalledB(c);
    a <<= veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongFunctionCalledB(c);
    a >>= veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongFunctionCalledB(c);
    a += veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongFunctionCalledB(c);
    a -= veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongFunctionCalledB(c);
    a *= veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongFunctionCalledB(c);
    a /= veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongFunctionCalledB(c);
    a %= veryVeryVeryVeryVeryLongVariableCalledA + veryVeryVeryVeryVeryLongFunctionCalledB(c);
  }
}


contract LogicalOperators {
  // ['&&', '||']
  function someFunction() {
    a && b;
    a || b;
    a || b && c || d && e;
    veryVeryVeryVeryVeryLongVariableCalledA && veryVeryVeryVeryVeryLongVariableCalledB;
    veryVeryVeryVeryVeryLongVariableCalledA || veryVeryVeryVeryVeryLongVariableCalledB;
    veryVeryVeryVeryVeryLongVariableCalledA || veryVeryVeryVeryVeryLongVariableCalledB && c || d && e;
    a = veryVeryVeryVeryVeryLongVariableCalledA && veryVeryVeryVeryVeryLongVariableCalledB;
    if (veryVeryVeryVeryVeryLongVariableCalledA && veryVeryVeryVeryVeryLongVariableCalledB == a()) {}
    if (a() == veryVeryVeryVeryVeryLongVariableCalledA && veryVeryVeryVeryVeryLongVariableCalledB) {}
    if (veryVeryVeryVeryVeryLongVariableCalledA && veryVeryVeryVeryVeryLongVariableCalledB) {}
    if (veryVeryVeryVeryVeryLongVariableCalledA && veryVeryVeryVeryVeryLongVariableCalledB || c) {}
    if (veryVeryVeryVeryVeryLongVariableCalledA || veryVeryVeryVeryVeryLongVariableCalledB && c) {}
    while (veryVeryVeryVeryVeryLongVariableCalledA && veryVeryVeryVeryVeryLongVariableCalledB == a()) {}
    while (a() == veryVeryVeryVeryVeryLongVariableCalledA && veryVeryVeryVeryVeryLongVariableCalledB) {}
    while (veryVeryVeryVeryVeryLongVariableCalledA && veryVeryVeryVeryVeryLongVariableCalledB) {}
    while (veryVeryVeryVeryVeryLongVariableCalledA && veryVeryVeryVeryVeryLongVariableCalledB || c) {}
    while (veryVeryVeryVeryVeryLongVariableCalledA || veryVeryVeryVeryVeryLongVariableCalledB && c) {}
    for (a = veryVeryVeryVeryVeryLongVariableCalledA; a <= veryVeryVeryVeryVeryLongVariableCalledA; a += veryVeryVeryVeryVeryLongVariableCalledA || veryVeryVeryVeryVeryLongVariableCalledB ? 1:2) {}
    a(veryVeryVeryVeryVeryLongVariableCalledA || veryVeryVeryVeryVeryLongVariableCalledB);
    return veryVeryVeryVeryVeryLongVariableCalledA || veryVeryVeryVeryVeryLongVariableCalledB;
  }
}
