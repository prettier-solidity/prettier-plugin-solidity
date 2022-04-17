# prettier-plugin-solidity

---
**NOTE**

This is the fork of the Ethereum-solidity plugin for prettier. This plugin works with Everscale Solidity (or ton-solidity)

---

[![Telegram](/assets/telegram-badge.svg)](https://t.me/tonsolidity)

<p align="center">
  <img width="375" height="375" src="https://user-images.githubusercontent.com/26024499/161311294-fcd187b2-0366-418d-a89b-96848e6adb15.png">
</p>

A [Prettier plugin](https://prettier.io/docs/en/plugins.html) for automatically formatting your [Everscale Solidity](https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/API.md) code.

## Installation and usage

Install both `prettier` and `prettier-plugin-solidity`:

```Bash
npm install --save-dev prettier github:pizza-777/prettier-plugin-solidity
```

Run prettier in your contracts:

1. Format all contracts

```Bash
npx prettier --write 'contracts/**/*.sol'
```

2. Format concrete contract

```Bash
npx prettier --write 'fileName.sol'
```

You can add a script to your package.json for running prettier on all your contracts:

```Bash
"scripts": {
   "format": "prettier --write 'contracts/**/*.sol'"
  }
```

You can add a script to your package.json for running prettier on all your contracts:

```Bash
"lint": "prettier --list-different 'contracts/**/*.sol'"
```

## Configuration File

Prettier provides a flexible system to configure the formatting rules of a project. For more information please refer to the [documentation](https://prettier.io/docs/en/configuration.html).
The following is the default configuration internally used by this plugin.

```json
{
  "overrides": [
    {
      "files": "*.sol",
      "options": {
        "printWidth": 80,        
        "useTabs": true,
        "singleQuote": false,
        "bracketSpacing": false,
        "explicitTypes": "always"
      }
    }
  ]
}
```

Note the use of the [overrides property](https://prettier.io/docs/en/configuration.html#configuration-overrides) which allows for multiple configurations in case there are other languages in the project (i.e. JavaScript, JSON, Markdown).

Most options are described in Prettier's [documentation](https://prettier.io/docs/en/options.html).

### Explicit Types

Solidity provides the aliases `uint` and `int` for `uint256` and `int256` respectively.
Multiple developers will have different coding styles and prefer one over another.
This option was added to standardize the code across a project and enforce the usage of one alias over another.

Valid options:

- `"always"`: Prefer explicit types (`uint256`, `int256`, etc.)
- `"never"`: Prefer type aliases (`uint`, `int`, etc.).
- `"preserve"`: Respect the type used by the developer.

| Default    | CLI Override                                 | API Override                                 |
| ---------- | -------------------------------------------- | -------------------------------------------- |
| `"always"` | `--explicit-types <always\|never\|preserve>` | `explicitTypes: "<always\|never\|preserve>"` |

```Solidity
// Input
uint public a;
int256 public b;

// "explicitTypes": "always"
uint256 public a;
int256 public b;

// "explicitTypes": "never"
uint public a;
int public b;

// "explicitTypes": "preserve"
uint public a;
int256 public b;
```

Note: switching between `uint` and `uint256` does not alter the bytecode at all and we have implemented tests for this. However, there will be a change in the AST reflecting the switch.

## Integrations

### VSCode

VSCode is not familiar with the Everscale Solidity language, so [`Everscale solidity support`](https://marketplace.visualstudio.com/items?itemName=everscale.solidity-support) needs to be installed.

```Bash
code --install-extension everscale.solidity-support
```

You can format a file with the context menu:

<img src="https://user-images.githubusercontent.com/26024499/161323920-02d2b6a1-59a7-431e-9ccd-7fdf33cb36a4.gif">

This extension provides basic integration with Prettier for most cases no further action is needed.

Make sure your editor has format on save set to true.
When you save VSCode will ask you what formatter would you like to use for the solidity language, you can choose `everscale.solidity-support`.

At this point VSCode's `settings.json` should have a configuration similar to this:

```JSON
{
  "solidity.formatter": "prettier", // This is the default so it might be missing.
  "[ton-solidity]": {
    "editor.defaultFormatter": "everscale.solidity-support"
  },
}
```

If you want more control over other details, you should proceed to install [`prettier-vscode`](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

```Bash
code --install-extension esbenp.prettier-vscode
```

Note: By design, Prettier prioritizes a local over a global configuration. If you have a `.prettierrc` file in your porject, your VSCode's default settings or rules in `settings.json` are ignored ([prettier/prettier-vscode#1079](https://github.com/prettier/prettier-vscode/issues/1079)).

## Edge cases

Prettier Solidity does its best to be pretty and consistent, but in some cases it falls back to doing things that are less than ideal.

### Modifiers in constructors

Modifiers with no arguments are formatted with their parentheses removed, except for constructors. The reason for this is that Prettier Solidity cannot always tell apart a modifier from a base constructor. So modifiers in constructors are not modified. For example, this:

```solidity
contract Foo is Bar {
  constructor() Bar() modifier1 modifier2() modifier3(42) {}

  function f() modifier1 modifier2() modifier3(42) {}
}
```

will be formatted as

```solidity
contract Foo is Bar {
  constructor() Bar() modifier1 modifier2() modifier3(42) {}

  function f() modifier1 modifier2 modifier3(42) {}
}
```

Notice that the unnecessary parentheses in `modifier2` were removed in the function but not in the constructor.

## Contributing

This fork is based on two others:

- <a href="https://github.com/pizza-777/parser/tree/ton-solidity-module">Parser</a>

- <a href="https://github.com/pizza-777/antlr/tree/ton-solidity">ANTLR Grammar</a>

## License

Distributed under the MIT license. See [LICENSE](LICENSE) for more information.
