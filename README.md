# prettier-plugin-solidity

[![CI](https://github.com/prettier-solidity/prettier-plugin-solidity/actions/workflows/CI.yml/badge.svg)](https://github.com/prettier-solidity/prettier-plugin-solidity/actions)
[![Telegram](/assets/telegram-badge.svg)](https://t.me/+kgTgkFgIwJkwMjcx)
[![Twitter Follow](https://img.shields.io/twitter/follow/PrettierSol.svg?style=social)](https://x.com/PrettierSol)
[![GitPOAP Badge](https://public-api.gitpoap.io/v1/repo/prettier-solidity/prettier-plugin-solidity/badge)](https://www.gitpoap.io/gh/prettier-solidity/prettier-plugin-solidity)

<p align="center">
  <img width="375" height="375" src="https://user-images.githubusercontent.com/1022054/59317198-f1149b80-8d15-11e9-9b0f-0c5e7d4b8b81.png">
</p>

> ℹ️ This README is for the new major version of Prettier Plugin Solidity.
>
> The differences from v1 are minimal, but there are some breaking changes.
>
> To migrate from v1, follow the [migration guide](#migrating-from-v1).
>
> If you're looking for the previous version, check out the [v1 branch](https://github.com/prettier-solidity/prettier-plugin-solidity/tree/v1).

A [Prettier](https://prettier.io/) plugin for automatically formatting your [Solidity](https://docs.soliditylang.org/en/latest/) code.

## Installation and usage

### Using in NodeJS

Install both `prettier` and `prettier-plugin-solidity`:

```Bash
npm install --save-dev prettier prettier-plugin-solidity
```

Run prettier on your contracts:

```Bash
npx prettier --write --plugin=prettier-plugin-solidity 'contracts/**/*.sol'
```

You can add an npm script to run prettier on all your contracts:

```
"prettier": "prettier --write --plugin=prettier-plugin-solidity 'contracts/**/*.sol'"
```

Or you can use it as part of your linting to check that all your code is prettified:

```
"lint": "prettier --list-different --plugin=prettier-plugin-solidity 'contracts/**/*.sol'"
```

> Prettier Solidity only works with valid code. If there is a syntax error, nothing will be done and a parser error will be thrown.

### Using in the Browser

To use this package in the browser, you need to load Prettier's standalone bundle before loading the build provided in this package.

Prettier's unpkg field points to `https://unpkg.com/prettier/standalone.js`, in a similar way this plugin points to `https://unpkg.com/prettier-plugin-solidity/dist/standalone.js`.

Once the scripts are loaded you will have access to the globals `prettier` and `prettierPlugins`.

We follow Prettier's strategy for populating their plugins in the object `prettierPlugins`, you can load other plugins like `https://unpkg.com/prettier@2.8.0/parser-markdown.js` and Prettier will have access to multiple parsers.

```html
<script type="module">
  const prettier = await import(
    'https://unpkg.com/prettier-plugin-solidity@latest'
  );
  const prettierSolidity = await import(
    'https://unpkg.com/prettier-plugin-solidity@next'
  );

  async function format(code) {
    return await prettier.format(code, {
      parser: 'slang',
      plugins: [solidityPlugin]
    });
  }

  const originalCode = 'contract Foo {}';
  const formattedCode = format(originalCode);
</script>
```

For more details, have a look at [Prettier's documentation](https://prettier.io/docs/en/browser.html).

### Creating a package for the Browser

If you are creating your own package to be run in a browser, you might want to import the standalone files directly.

```Javascript
import prettier from "prettier/standalone";
import solidityPlugin from "prettier-plugin-solidity/standalone";

async function format(code) {
  return await prettier.format(code, {
    parser: "slang",
    plugins: [solidityPlugin],
  });
}

const originalCode = "contract Foo {}";
const formattedCode = format(originalCode);
```

## Configuration File

Prettier provides a flexible system to configure the formatting rules of a project. For more information please refer to the [documentation](https://prettier.io/docs/en/configuration.html).
The following is the default configuration internally used by this plugin.

```JSON
{
  "plugins": ["prettier-plugin-solidity"],
  "overrides": [
    {
      "files": "*.sol",
      "options": {
        "parser": "slang",
        "printWidth": 80,
        "tabWidth": 4,
        "useTabs": false,
        "singleQuote": false,
        "bracketSpacing": false,
      }
    }
  ]
}
```

Note the use of the [overrides property](https://prettier.io/docs/en/configuration.html#configuration-overrides) which allows for multiple configurations in case there are other languages in the project (i.e. JavaScript, JSON, Markdown).

Since Prettier v3.0.0, the plugin search feature has been removed so we encourage adding our plugin to the configuration file.

Most options are described in Prettier's [documentation](https://prettier.io/docs/en/options.html).

### Compiler

Many versions of the Solidity compiler have changes that affect how the code should be formatted. This plugin, by default, tries to format the code in the most compatible way that is possible, but you can use the `compiler` option to nudge it in the right direction.

One example of this is import directives. Before `0.7.4`, the compiler didn't accept multi-line import statements, so we always format them in a single line. But if you use the `compiler` option to indicate that you are using a version greater or equal than `0.7.4`, the plugin will use multi-line imports when it makes sense.

The Solidity versions taken into consideration during formatting are:

- `v0.7.4`: Versions prior `0.7.4` had a bug that would not interpret correctly imports unless they are formatted in a single line.

  ```Solidity
  // Input
  import { Foo as Bar, Baz as Qux } from "/an/extremely/long/location";

  // "compiler": undefined, parser: "antlr"
  import { Foo as Bar, Baz as Qux } from "/an/extremely/long/location";

  // "compiler": "0.7.3" (or lesser)
  import { Foo as Bar, Baz as Qux } from "/an/extremely/long/location";

  // "compiler": "0.7.4" (or greater)
  import {
      Foo as Bar,
      Baz as Qux
  } from "/an/extremely/long/location";
  ```

- `v0.8.0`: Introduced these [changes](https://docs.soliditylang.org/en/v0.8.0/080-breaking-changes.html)
  - The type `byte` has been removed. It was an alias of `bytes1`.
  - Exponentiation is right associative, i.e., the expression `a**b**c` is parsed as `a**(b**c)`. Before 0.8.0, it was parsed as `(a**b)**c`.

  ```Solidity
  // Input
  bytes1 public a;
  byte public b;

  uint public c = 1 ** 2 ** 3;

  // "compiler": undefined
  bytes1 public a;
  byte public b;

  uint public c = 1**2**3;

  // "compiler": "0.7.6" (or lesser)
  bytes1 public a;
  byte public b;

  uint public c = (1**2)**3;

  // "compiler": "0.8.0" (or greater)
  bytes1 public a;
  bytes1 public b;

  uint public c = 1**(2**3);
  ```

You might have a multi-version project, where different files are compiled with different compilers. If that's the case, you can use [overrides](https://prettier.io/docs/en/configuration.html#configuration-overrides) to have a more granular configuration:

```JSON
{
  "overrides": [
    {
      "files": "contracts/v1/**/*.sol",
      "options": {
        "compiler": "0.6.3"
      }
    },
    {
      "files": "contracts/v2/**/*.sol",
      "options": {
        "compiler": "0.8.4"
      }
    }
  ]
}
```

| Default                                                                                       | CLI Override          | API Override           |
| --------------------------------------------------------------------------------------------- | --------------------- | ---------------------- |
| Inferred from pragma statements when using parser `slang`<br/> None when using parser `antlr` | `--compiler <string>` | `compiler: "<string>"` |

### Parser

You can configure the parser used by Prettier Solidity. Two Solidity parsers are supported:

- [Slang](https://nomicfoundation.github.io/slang) (the default), a more powerful and correct parser that results in better formatting for some edge cases, especially when comments are involved.
- [Solidity Parser for JavaScript](https://github.com/solidity-parser/parser/), an [ANTLR](https://www.antlr.org/)-based parser. This is the version that Prettier Solidity v1 used by default. This parser is still supported in v2, but it's deprecated and will be removed in the next major version. You can use this parser by setting `parser: "antlr"` in your Prettier configuration.

| Default | CLI Override        | API Override         |
| ------- | ------------------- | -------------------- |
| `slang` | `--parser <string>` | `parser: "<string>"` |

### Experimental Ternaries

Mimicking prettier's [new ternary formatting](https://prettier.io/blog/2023/11/13/curious-ternaries) for the community to try.

Valid options:

- `true` - Use curious ternaries, with the question mark after the condition.
- `false` - Retain the default behavior of ternaries; keep question marks on the same line as the consequent.

| Default | CLI Override               | API Override                    |
| ------- | -------------------------- | ------------------------------- |
| false   | `--experimental-ternaries` | `experimentalTernaries: <bool>` |

## Integrations

### Vim

To integrate this plugin with vim, first install [`vim-prettier`](https://github.com/prettier/vim-prettier). These
instructions assume you are using [`vim-plug`](https://github.com/junegunn/vim-plug). Add this to your configuration:

```vim
Plug 'prettier/vim-prettier', {
  \ 'do': 'yarn install && yarn add prettier-plugin-solidity',
  \ 'for': [
    \ 'javascript',
    \ 'typescript',
    \ 'css',
    \ 'less',
    \ 'scss',
    \ 'json',
    \ 'graphql',
    \ 'markdown',
    \ 'vue',
    \ 'lua',
    \ 'php',
    \ 'python',
    \ 'ruby',
    \ 'html',
    \ 'swift',
    \ 'solidity'] }
```

We modified the `do` instruction to also install this plugin. Then you'll have to configure the plugin to always use the version installed in the vim plugin's directory. The vim-plug directory depends on the value you use in `call plug#begin('~/.vim/<dir>')`:

```vim
let g:prettier#exec_cmd_path = '~/.vim/plugged/vim-prettier/node_modules/.bin/prettier'
```

To check that everything is working, open a Solidity file and run `:Prettier`.

If you also want to autoformat every time you write the buffer, add these lines:

```vim
let g:prettier#autoformat = 0
autocmd BufWritePre *.sol Prettier
```

Now Prettier will be run every time the file is saved.

### VSCode

VSCode is not familiar with the Solidity language. There are two extensions that you can install to provide support for Solidity:

- [`hardhat-solidity`](https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity)
- [`solidity`](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)

We recommend using the `hardhat-solidity` extension:

```Bash
code --install-extension NomicFoundation.hardhat-solidity
```

These extensions provide basic integration with Prettier; in most cases, no further action is needed.

Make sure your editor has format-on-save set to true. When you save, VSCode will ask you what formatter would you like to use for the Solidity language. We recommend choosing `NomicFoundation.hardhat-solidity`.

At this point VSCode's `settings.json` should have a configuration similar to this:

```JSON5
{
  "editor.formatOnSave": true,
  "solidity.formatter": "prettier", // This is the default so it might be missing.
  "[solidity]": {
    "editor.defaultFormatter": "NomicFoundation.hardhat-solidity"
  }
}
```

If you want more control over other details, you should proceed to install [`prettier-vscode`](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

```Bash
code --install-extension esbenp.prettier-vscode
```

To interact with third-party plugins, `prettier-vscode` will look in the project's npm modules, so you'll need to have `prettier` and `prettier-plugin-solidity` in your `package.json`

```Bash
npm install --save-dev prettier prettier-plugin-solidity
```

This will allow you to specify the version of the plugin in case you want to use the latest version of the plugin or need to freeze the formatting since new versions of this plugin will implement tweaks on the possible formats.

You'll have to let VSCode know what formatter you prefer.
This can be done by opening the command palette and executing:

```
>Preferences: Configure Language Specific Settings...

# Select Language
solidity
```

Now VSCode's `settings.json` should have this:

```JSON
{
  "editor.formatOnSave": true,
  "[solidity]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

Note: By design, Prettier prioritizes a local over a global configuration. If you have a `.prettierrc` file in your project, your VSCode's default settings or rules in `settings.json` are ignored ([prettier/prettier-vscode#1079](https://github.com/prettier/prettier-vscode/issues/1079)).

### pnpm

To make Prettier Solidity work in your project, you have to add a `.prettierrc` file as shown [here](#configuration-file).

Then, if you are using VSCode, you also need to add this to your VSCode settings:

```json
{
  "prettier.documentSelectors": ["**/*.sol"]
}
```

## Edge cases

Prettier Solidity does its best to be pretty and consistent, but in some cases it falls back to doing things that are less than ideal.

### Modifiers in constructors

Modifiers with no arguments are formatted with their parentheses removed, except for constructors. The reason for this is that Prettier Solidity cannot always tell apart a modifier from a base constructor. So modifiers in constructors are not modified. For example, this:

```Solidity
contract Foo is Bar {
  constructor() Bar() modifier1 modifier2() modifier3(42) {}

  function f() modifier1 modifier2() modifier3(42) {}
}
```

will be formatted as

```Solidity
contract Foo is Bar {
  constructor() Bar() modifier1 modifier2() modifier3(42) {}

  function f() modifier1 modifier2 modifier3(42) {}
}
```

Notice that the unnecessary parentheses in `modifier2` were removed in the function but not in the constructor.

## Migrating from v1

In most cases, upgrading to v2 of Prettier Solidity should be as easy as installing the latest version:

```bash
npm install prettier-plugin-solidity@latest
```

If you had the parser explicitly set in your config, you'll get this error:

```
[error] Couldn't resolve parser "solidity-parse".
```

To fix it, simply update the `parser` option in your `.prettierrc`:

```
"parser": "slang",
```

## Contributing

1. [Fork it](https://github.com/prettier-solidity/prettier-plugin-solidity/fork)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. All existing tests and coverage must pass (`npm run test:all`), if coverage drops below 100% add missing tests.
5. Push to the branch (`git push origin feature/fooBar`)
6. Create a new Pull Request

## License

Distributed under the MIT license. See [LICENSE](LICENSE) for more information.
