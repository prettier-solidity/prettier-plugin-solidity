# prettier-plugin-solidity

[![Build Status](https://travis-ci.com/prettier-solidity/prettier-plugin-solidity.svg?branch=master)](https://travis-ci.com/prettier-solidity/prettier-plugin-solidity)
[![codecov](https://codecov.io/gh/prettier-solidity/prettier-plugin-solidity/branch/master/graph/badge.svg)](https://codecov.io/gh/prettier-solidity/prettier-plugin-solidity)

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

## Contributing

1. [Fork it](https://github.com/prettier-solidity/prettier-plugin-solidity/fork)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

Distributed under the MIT license. See [LICENSE](LICENSE) for more information.
