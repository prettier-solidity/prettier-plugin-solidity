# prettier-plugin-solidity

[![Build Status](https://travis-ci.com/prettier-solidity/prettier-plugin-solidity.svg?branch=master)](https://travis-ci.com/prettier-solidity/prettier-plugin-solidity)
[![codecov](https://codecov.io/gh/prettier-solidity/prettier-plugin-solidity/branch/master/graph/badge.svg)](https://codecov.io/gh/prettier-solidity/prettier-plugin-solidity)
[![Telegram](/assets/telegram-badge.svg)](https://t.me/joinchat/Je2WJFCfKJ_mht1XdhBh6w)

This is a work in progress [Prettier Plugin](https://prettier.io/docs/en/plugins.html) for [Solidity](https://github.com/ethereum/solidity).

## Installation and usage

Install both `prettier` and `prettier-plugin-solidity`:

```
npm install --save-dev prettier prettier-plugin-solidity
```

You can add a script for running prettier on all your contracts:

```
"prettier": "prettier --write **/*.sol"
```

Or you can use it as part of your linting to check that all your code is prettified:

```
"lint": "prettier --list-different **/*.sol"
```

## Integrations

### Vim

To integrate this plugin with vim, first install [`vim-prettier`](https://github.com/prettier/vim-prettier). These
instructions assume you are using [`vim-plug`](https://github.com/junegunn/vim-plug). Add this to your configuration:

```vim
Plug 'prettier/vim-prettier', {
  \ 'do': 'yarn install && yarn add prettier-plugin-solidity',
  \ 'branch': 'release/1.x',
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

We modified the `do` instruction to also install this plugin. Then you'll have to configure the plugin to always use the
version installed in the vim plugin's directory:

```vim
let g:prettier#exec_cmd_path = '~/.vim/bundle/vim-prettier/node_modules/.bin/prettier'
```

To check that everything is working, open a solidity file and run `:Prettier`.

If you also want to autoformat every time you write the buffer, add these lines:

```vim
let g:prettier#autoformat = 0
autocmd BufWritePre *.sol Prettier
```

Now Prettier will be run every time the file is saved.

### VSCode

VSCode is not familiar with the solidity language, so [`solidity support`](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) needs to be installed.

```Bash
code --install-extension JuanBlanco.solidity
```

Having done that you should proceed to install [`prettier-vscode`](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

```Bash
code --install-extension esbenp.prettier-vscode
```

To interact with 3rd party plugins, `prettier-vscode` will look in the project's npm modules, so you'll need to have `prettier` and `prettier-plugin-solidity` in your `package.json`

```
npm install --save-dev prettier prettier-plugin-solidity
```

As a final check, make sure that VSCode is configured to format files on save.

You'll notice now that `prettier` is formatting every time the files are saved but the indentation is using 2 spaces instead of 4. This has been [reported](https://github.com/prettier/prettier-vscode/issues/961) and in the meantime you can use the following configuration in your `.prettierrc` file:

```json
{
  "overrides": [
    {
      "files": "*.sol",
      "options": {
        "printWidth": 80,
        "tabWidth": 4,
        "useTabs": false,
        "singleQuote": false,
        "bracketSpacing": false,
        "explicitTypes": "always"
      }
    }
  ]
}
```

Note: When you install the npm package `prettier` in your project and create a `.prettierrc` file (which wasn't in your project before this), your VSCode's default settings or rules in `settings.json` are ignored ([prettier/prettier-vscode#1079](https://github.com/prettier/prettier-vscode/issues/1079)).

If you want a different configuration for your javascript and solidity files, you can add an [overrides property](https://prettier.io/docs/en/configuration.html#configuration-overrides) to your `.prettierrc`.

## Contributing

1. [Fork it](https://github.com/prettier-solidity/prettier-plugin-solidity/fork)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

Distributed under the MIT license. See [LICENSE](LICENSE) for more information.
