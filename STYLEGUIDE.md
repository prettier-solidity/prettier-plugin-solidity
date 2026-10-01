# Style Guide

This document describes how Prettier Solidity formats code and why. It follows the [Solidity style guide](https://docs.soliditylang.org/en/latest/style-guide.html) in most places. Where it doesn't, it's usually because a formatter has to make a decision the style guide leaves to the author.

Every example below is real output from the plugin, using the `slang` parser and the default options.

## Defaults

| Option                                                                                            | Default | Notes                                                                              |
| ------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------- |
| [`tabWidth`](https://prettier.io/docs/options#tab-width)                                          | `4`     | Prettier's default is `2`.                                                         |
| [`printWidth`](https://prettier.io/docs/options#print-width)                                      | `80`    |                                                                                    |
| [`useTabs`](https://prettier.io/docs/options#tabs)                                                | `false` |                                                                                    |
| [`singleQuote`](https://prettier.io/docs/options#quotes)                                          | `false` |                                                                                    |
| [`bracketSpacing`](https://prettier.io/docs/options#bracket-spacing)                              | `false` | Prettier's default is `true`.                                                      |
| [`experimentalOperatorPosition`](https://prettier.io/docs/options#experimental-operator-position) | `end`   | Operators stay at the end of the line when an operation wraps.                     |
| [`experimentalTernaries`](https://prettier.io/docs/options#experimental-ternaries)                | `false` |                                                                                    |
| `compiler`                                                                                        | —       | Inferred from the `pragma` statements, see [Compiler](#compiler-aware-formatting). |

## Blank lines

The plugin keeps the author's blank lines instead of enforcing a layout:

- Several blank lines in a row are collapsed into one.
- Blank lines at the start and end of a block are removed.
- Blank lines are never added. Two contracts or two functions written next to each other stay next to each other.

```solidity
contract B {
    uint256 a;
    uint256 b;

    function spam() public pure {}
    function ham() public pure {}
}
```

The style guide asks for two blank lines between top-level declarations and one between functions. The plugin doesn't enforce either of these, so groups of related one-liners can stay together.

## Wrapping

When something doesn't fit in `printWidth`, the plugin breaks the outermost group first. Every element then goes on its own line, indented once, and the closing bracket goes on its own line.

```solidity
IERC20(token).safeTransferFrom(
    msg.sender,
    address(this),
    amountToTransfer
);

emit Withdraw(
    msg.sender,
    receiverAddress,
    ownerAddress,
    assetsWithdrawn,
    sharesBurned
);

(bool success, bytes memory returndata) = target.call{
    value: value,
    gas: gasleft()
}(data);
```

The same applies to inheritance lists, imports, and mappings. If a declaration's type is too long, what follows it moves to the next line:

```solidity
import {
    IERC20,
    IERC20Metadata,
    SafeERC20,
    Address
} from "./very/long/path/to/the/tokens.sol";

contract Demo is
    Ownable,
    ReentrancyGuard,
    Pausable,
    AccessControlEnumerable,
    ERC165
{
    mapping(address owner => mapping(address spender => uint256 amount))
        private _allowances;
}
```

## Functions

### Attribute order

Function attributes are reordered to match the style guide:

1. visibility
2. state mutability
3. `virtual`
4. `override`
5. custom modifiers and base constructor calls, in their original order

```solidity
// Input
function f() virtual override onlyOwner() whenNotPaused external view {}

// Output
function f() external view virtual override onlyOwner whenNotPaused {}
```

### Empty modifier parentheses

Parentheses on a modifier invocation without arguments are removed, as in `onlyOwner` above. Constructors are the exception. In a constructor, `Bar()` might be a call to a base contract's constructor rather than a modifier, and there's no way to tell them apart from syntax alone, so constructors keep their parentheses. Before Solidity 0.5.0, a function with the same name as its contract is a constructor, so the plugin leaves those alone too.

### Long declarations

Parameters break first. If the attributes still don't fit, they go one per line, and the opening brace moves to its own line:

```solidity
constructor(
    uint256 param1,
    uint256 param2,
    uint256 param3,
    uint256 param4
) payable B(param1) C(param2, param3) D(param4) {}

function thisFunctionNameIsReallyLong(
    address a,
    address b,
    address c
)
    public
    returns (
        address someAddressName,
        uint256 longArgument,
        uint256 argument
    )
{
    // ...
}
```

## Binary operations

This is the most involved part of the printer. It lives in [`print-binary-operation.ts`](src/slang-printers/print-binary-operation.ts) and [`create-binary-operation-printer.ts`](src/slang-printers/create-binary-operation-printer.ts), with a separate printer for `&&` and `||` in [`print-logical-operation.ts`](src/slang-printers/print-logical-operation.ts). Every node type for an operation passes its own rules to these printers, for example [`AdditiveExpression.ts`](src/slang-nodes/AdditiveExpression.ts).

### Breaking

When an operation doesn't fit, every operator in the chain moves to the end of its line and each operand goes on its own line:

```solidity
return
    userCollateralBalance +
    accruedInterest * interestRateMultiplier -
    outstandingDebt;
```

Operations are grouped by precedence. In the example above, `accruedInterest * interestRateMultiplier` stays on one line because it binds tighter than the `+` and `-` around it. It only breaks if it doesn't fit on its own line.

With `experimentalOperatorPosition: "start"`, the operator starts the next line instead:

```solidity
uint256 totalAssets =
    idleAssetBalance
        + assetsDeployedInStrategies
        + pendingWithdrawalAssets;
```

### Indentation

Whether the operands after the first get an extra indent depends on where the operation is:

- **No extra indent** when the construct around it already provides it. This covers a `return` value, the condition of an `if` or `while`, the condition of a `for`, and the right side of an assignment.
- **Extra indent** everywhere else, such as in a variable declaration or a function argument. The extra indent separates the continuation lines from whatever comes next.

```solidity
totalAssets =
    idleAssetBalance +
    assetsDeployedInStrategies +
    pendingWithdrawalAssets;

uint256 totalAssets =
    idleAssetBalance +
        assetsDeployedInStrategies +
        pendingWithdrawalAssets;

if (
    (msg.sender != owner && !operatorApprovals[owner][msg.sender]) ||
    block.timestamp > permitDeadline
) {
    revert Unauthorized();
}

require(
    block.timestamp >= auctionStartTime &&
        block.timestamp <= auctionEndTime &&
        !auctionCancelled,
    "Auction not active"
);
```

A small right-hand operand, like the `- 1` in `a.length - 1`, is grouped with the operator. That way it never ends up alone on a line.

## Parentheses for clarity

The style guide suggests showing precedence with spacing, as in `x = 2*y + 3*z`. The plugin always puts a single space around every operator. Where precedence isn't obvious, it adds parentheses instead:

```solidity
// Input
uint256 c = a + b * c - d / e % f;
uint256 d = a * b / c % d;
uint256 e = a << b + c & d | e ^ f;
uint256 g = a ** b ** c;
bool h = a == b == c;
bool i = a && b || c && d;

// Output
uint256 c = a + b * c - ((d / e) % f);
uint256 d = ((a * b) / c) % d;
uint256 e = ((a << (b + c)) & d) | (e ^ f);
uint256 g = a ** (b ** c);
bool h = (a == b) == c;
bool i = (a && b) || (c && d);
```

The rules, written in [`create-hug-function.ts`](src/slang-utils/create-hug-function.ts) and applied in each operation's node:

| Operation | Wraps an operand that uses             | Operands checked |
| --------- | -------------------------------------- | ---------------- |
| `+` `-`   | `%`                                    | both             |
| `*`       | `/` `%`                                | left             |
| `/`       | `*` `%`                                | left             |
| `%`       | `*` `/` `%`                            | left             |
| `**`      | `**`                                   | both             |
| `<<` `>>` | `+` `-` `*` `/` `**` `<<` `>>`         | left             |
| `<<` `>>` | `+` `-` `*` `/` `**`                   | right            |
| `&`       | `+` `-` `*` `/` `**` `<<` `>>`         | both             |
| `^`       | `+` `-` `*` `/` `**` `<<` `>>` `&`     | both             |
| `\|`      | `+` `-` `*` `/` `**` `<<` `>>` `&` `^` | both             |
| `==` `!=` | `==` `!=`                              | left             |
| `\|\|`    | `&&`                                   | both             |

Nested `**` is always wrapped because its associativity changed in Solidity 0.8.0. `a ** b ** c` means `(a ** b) ** c` before 0.8.0 and `a ** (b ** c)` after. Slang parses the code for the version in the `pragma`, and the plugin writes the grouping out explicitly. The result means the same thing to any compiler that reads it:

```solidity
pragma solidity ^0.7.0;
contract C {
    uint public c = (1 ** 2) ** 3;
}
```

### Operations without parentheses

When no rule adds parentheses, the order of evaluation is still shown through grouping and indentation. Since `x = a + b * c;` fits on one line, it shows nothing. Once a line breaks, the operations that are evaluated first stay together or get an extra indent:

```solidity
newPrice =
    currentBasePrice +
    priceIncrementPerTokenSold *
        cumulativeTokensSold *
        bondingCurveScalingFactor;

canWithdraw =
    userDepositBalance + pendingRewardAmount >=
        minimumWithdrawalAmount &&
    !withdrawalsPaused;
```

In the first example, the multiplication is evaluated before the `+`, so its operands are indented under `priceIncrementPerTokenSold`. In the second, the addition fits on one line and stays together, while `>=` indents the operand it compares against. The `&&` joins the two lines at the outer level.

### How we make sure this is safe

Adding parentheses changes the syntax tree (the AST), so the test suite checks formatting in two ways:

- For every fixture, the formatted code is parsed again and its AST must equal the original's.
- For the fixtures where the AST changes on purpose, the tests compile both versions with `solc` and require identical bytecode. These fixtures are listed in [`test-bytecode-compare.js`](tests/config/test-bytecode-compare.js).

Any new rule that changes the AST needs a fixture added to that list.

## Member access chains

A chain like `a.b(c).d[e].f` is printed in two parts. This is handled in [`MemberAccessExpression.ts`](src/slang-nodes/MemberAccessExpression.ts):

- The **head**: everything before the first `.`.
- The **rest**: grouped and indented as a unit.

This lets the head break without breaking the rest, and the other way round. The chain stays on one line as long as it fits, regardless of how many calls it has.

```solidity
a.b().c().d();

IERC20(token).safeTransferFrom(
    msg.sender,
    address(this),
    amountToTransfer
);

uint256 shares = IERC20(underlyingAssetToken)
    .balanceOf(address(this))
    .mulDiv(sharePrice, PRECISION);

uint256 index = ILendingPool(lendingPoolAddress)
    .getReserveData(underlyingAsset)
    .liquidityIndex;

registry
    .getModule(moduleId)
    .configuration
    .parameters
    .limits[index]
    .maximumValue = newMaximumValue;
```

When a function call or index access ends the chain, its arguments are indented with the rest of the chain rather than with the head. That's what [`print-member-access-chain-item.ts`](src/slang-printers/print-member-access-chain-item.ts) takes care of.

## Ternaries

Nested ternaries are indented like a tree:

```solidity
uint256 fee =
    isWhitelistedAccount
        ? 0
        : hasPremiumMembership
            ? discountedProtocolFee
            : standardProtocolFee;
```

With `experimentalTernaries: true`, they follow Prettier's ["curious ternaries"](https://prettier.io/blog/2023/11/13/curious-ternaries):

```solidity
uint256 fee =
    isWhitelistedAccount ? 0
    : hasPremiumMembership ? discountedProtocolFee
    : standardProtocolFee;
```

## Strings

Strings use double quotes, unless the string contains more double quotes than single quotes. In that case the plugin picks the quote that needs fewer escapes. Hex strings follow the same rule.

```solidity
// Input
bytes8 h = hex'DeadBeef';
string s = 'He said "hi"';
import {A} from './A.sol';

// Output
bytes8 h = hex"DeadBeef";
string s = 'He said "hi"';
import {A} from "./A.sol";
```

## Compiler-aware formatting

Some syntax changed between Solidity versions, so the output depends on the compiler version. The version comes from:

- the `compiler` option, if it's set: the plugin uses the latest Solidity version that matches it;
- otherwise, the `pragma solidity` statements: the plugin uses the latest version they allow, so `^0.7.0` is treated as `0.7.6`.

What the version affects:

- **Imports**: before 0.7.4, the compiler rejected import lists spread over several lines. Below that version, import lists always stay on one line.
- **`**` associativity**: the file is parsed with that version's rules, so nested `**` is grouped correctly. See [Parentheses for clarity](#parentheses-for-clarity).
- **Modifier parentheses**: before 0.5.0, a function with the same name as its contract is a constructor, so its parentheses are kept.

In a project that uses several compiler versions, set `compiler` per folder with Prettier's [overrides](https://prettier.io/docs/configuration#configuration-overrides).

## Assembly

Yul blocks are formatted like the rest of the code:

```solidity
assembly {
    let x := add(mload(0x40), 0x20)
    if iszero(x) {
        revert(0, 0)
    }
}
```

In old code, the assignment operators written with a space (`: =` and `= :`) become `:=` and `=:`.

## What the plugin leaves alone

- **Numbers** stay as written: `.1`, `2.3E5` and `1_000_000` aren't normalized.
- **Braces aren't added** around a single-statement body: `if (x < 10) x += 1;` stays as it is.
- **Comments** stay where they are, relative to the code around them.
- **Code after `// prettier-ignore`** is printed exactly as written:

```solidity
// prettier-ignore
uint256[] ignored = [1,2,
                   3,4];
```
