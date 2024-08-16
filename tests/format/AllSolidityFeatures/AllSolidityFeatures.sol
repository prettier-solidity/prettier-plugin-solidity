// Examples taken from the Solidity documentation online.

// for pragma version numbers, see https://docs.npmjs.com/misc/semver#versions
pragma solidity 0.4.0;
pragma solidity ^0.4.0;
pragma experimental ABIEncoderV2;

import "SomeFile.sol";
import "SomeFile.sol" as SomeOtherFile;

interface i {
  event ForeignEvent();
  function f();
}

event E();

contract c {
  function c()
  {
      emit i.ForeignEvent();
      val1 = 1 wei;    // 1
      val2 = type(uint).min;
      val3 = type(uint).max;
      val4 = 1 ether;  // 1 * 10 ** 18
 }
  uint256 val1;
  uint256 val2;
  uint256 val3;
  uint256 val4;
}

contract test {
    enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill }

    function test()
    {
        choices = ActionChoices.GoStraight;
    }
    function getChoice() returns (uint d)
    {
        d = uint256(choices);
    }
    ActionChoices choices;
}

contract Base {
    function Base(uint i)
    {
        m_i = i;
    }
    uint public m_i;
}
contract Derived is Base(0) {
    function Derived(uint i) Base(i) {}
}

contract C {
  uint248 x; // 31 bytes: slot 0, offset 0
  uint16 y; // 2 bytes: slot 1, offset 0 (does not fit in slot 0)
  uint240 z; // 30 bytes: slot 1, offset 2 bytes
  uint8 a; // 1 byte: slot 2, offset 0 bytes
  struct S {
    uint8 a; // 1 byte, slot +0, offset 0 bytes
    uint256 b; // 32 bytes, slot +1, offset 0 bytes (does not fit)
  }
  S structData; // 2 slots, slot 3, offset 0 bytes (does not really apply)
  uint8 alpha; // 1 byte, slot 4 (start new slot after struct)
  uint16[3] beta; // 3*16 bytes, slots 5+6 (start new slot for array)
  uint8 gamma; // 1 byte, slot 7 (start new slot after array)
}

contract test {
  function f(uint x, uint y) returns (uint z) {
    return 10;
  }
}

contract c {
  mapping(uint id => uint ) data;
  mapping(address owner => mapping(address spender => uint  amount)) allowances;
}

// This broke it at one point (namely the modifiers).
contract DualIndex {
  mapping(uint => mapping(uint => uint)) data;
  address public admin;

  modifier restricted { if (msg.sender == admin) _; }

  function DualIndex() {
    admin = msg.sender;
  }

  function set(uint key1, uint key2, uint value) restricted {
    uint[2][4] memory defaults; // "memory" broke things at one time.
    data[key1][key2] = value;
  }

  function transfer_ownership(address _admin) restricted {
    admin = _admin;
  }

  function lookup(uint key1, uint key2) returns(uint) {
    return data[key1][key2];
  }
}

contract A {

}

contract B {

}

contract C is A, B {

}

contract TestPrivate
{
  uint private value;
}

contract TestInternal
{
  uint internal value;
}

library VarHasBrackets {
	string constant specialRight = "}";
	//string storage specialLeft = "{";
}

library UsingExampleLibrary {
  function sum(uint[] storage self) returns (uint s) {
    for (uint i = 0; i < self.length; i++)
      s += self[i];
  }
}

contract UsingExampleContract {
  using UsingExampleLibrary for *;
  using UsingExampleLibrary for uint[];
  using Example.UsingExampleLibrary for uint;
}

contract NewStuff {
  uint[] b;

  function someFunction() payable {
    string storage a = hex"ab1248fe";
    b[2+2];
  }
}

// modifier with expression
contract MyContract {
  function fun() mymodifier(foo.bar()) {}
}

library GetCode {
    function at(address _addr) returns (bytes o_code) {
        assembly {
            // retrieve the size of the code, this needs assembly
            let size := extcodesize(_addr)
            // allocate output byte array - this could also be done without assembly
            // by using o_code = new bytes(size)
            o_code := mload(0x40)
            // new "memory end" including padding
            mstore(0x40, add(o_code, and(add(add(size, 0x20), 0x1f), not(0x1f))))
            // store length in memory
            mstore(o_code, size)
            // actually retrieve the code, this needs assembly
            extcodecopy(_addr, add(o_code, 0x20), 0, size)
        }
    }
}

contract assemblyLocalBinding {
  function test(){
    assembly {
      let v := 1
      let x := 0x00
      let y := x
      let z := "hello"
    }
  }
}

contract usesConst {
  uint const = 0;
}

contract memoryArrays {
  uint seven = 7;

  function returnNumber(uint number) returns (uint){
    return number;
  }

  function alloc() {
    uint[] memory a = new uint[](7);
    uint[] memory b = new uint[](returnNumber(seven));
  }
}

contract DeclarativeExpressions {
  uint a;
  uint b = 7;
  uint b2=0;
  uint public c;
  uint constant public d;
  uint public constant e;
  uint private constant f = 7;
  struct S { uint q;}

  function ham(S storage s1, uint[] storage arr) internal {
    uint x;
    uint y = 7;
    S storage s2 = s1;
    uint[] memory stor;
    uint[] storage stor2 = arr;
  }
}


contract TypeIndexSpacing {
  uint [ 7 ] x;
  uint  []  y;
}

contract multilineReturn {
  function a() returns (uint x) {
    return
      5;
  }
}

contract continueStatement {
  function a() {
    while (true) { continue; }
  }
}

abstract  contract  AbstractContract {

}

contract  ContractWithVirtual
{
  function   foo() public virtual  returns  ( uint ) {
  }
}

struct TopLevelStruct {
  uint x; uint y;
}

enum TopLevelEnum {
  Top,
      Level,
            Enum
}
pragma solidity ^0.6.0;


contract A {
    function doStuff() public virtual {}
}


contract B is A {
    function doStuff() public override {}
}

contract Overrides {
  mapping(address => bool) public override varName;
  mapping(address => bool) public override(Foo) varName;
  mapping(address => bool) public override(Foo, Bar) varName;
  mapping(address => bool) public override(Foo , Bar, Baz, Baaaz, Baaaaaaaaaaaaaaz, BazQuxBazQuxBazQux, Quuuuuuuuuuuuuux) varName;
  modifier onlyOwner() virtual {_;}

modifier onlyOwner() override {
    require(msg.sender == owner(), "Ownable: caller is not the owner");
    _;
}
modifier onlyOwner() override(Foo) {
    require(msg.sender == owner(), "Ownable: caller is not the owner");
    _;
}
modifier onlyOwner() override(Foo , Bar) {
    require(msg.sender == owner(), "Ownable: caller is not the owner");
    _;
}
modifier onlyOwner() override(Foo , Bar, Baz, Baaaz, Baaaaaaaaaaaaaaz, BazQuxBazQuxBazQux, Quuuuuuuuuuuuuux) {
    require(msg.sender == owner(), "Ownable: caller is not the owner");
    _;
}
  function foo()   public override  {}
  function bar()   public override( Foo  )  {}
  function baz()   public override(Foo , Bar)  {}
  function long()   public override(Foo , Bar, Baz, Baaaz, Baaaaaaaaaaaaaaz, BazQuxBazQuxBazQux, Quuuuuuuuuuuuuux)  {}
}

contract ConstructorWithoutVisibility {
  uint public x;

  constructor  ( uint _x ) {   
    x = _x;
  }
}

contract FunctionTypes {
    struct Something {
        function (address) external view   returns (uint256) getSomething;
    }

function reduce(
        uint256[] memory self, 
        function  (uint256, uint256) pure   returns (uint256) f
    ) internal pure returns (uint256 r) {
        r = self[0];
        for (uint256 i = 1; i < self.length; i++) {
            r = f(r, self[i]);
        }
    }
}

// top-level function
function   foo()   pure returns ( uint ) { return 42 ; }

contract AnonymousEvent {
  event   MyEvent() 
  anonymous;
}

uint   constant MULTIPLIER =
  2**EXPONENT;

contract WithUncheckedBlock {
  function f() public pure returns (uint) {
    uint x = 0;
    unchecked   {   x--;   }
    return x;
  }
  
  function g() public pure returns (uint) {
    uint x = 0;
    unchecked   {   x--; return x; }
  }

  function mul(uint256 x, uint256 y) internal pure returns (uint256) {
    unchecked { return x * y; }
  }
}

// user-defined operators
using {  add as +   }   for   Fixed18   global  ;
using {  add   as +  , sub as - } for   Fixed18 global  ;
using {  add   , sub as -   } for Fixed18   global  ;
using {    add as   +  , sub   } for   Fixed18 global  ;
