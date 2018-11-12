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

## Contributing

1. [Fork it](https://github.com/prettier-solidity/prettier-plugin-solidity/fork)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

Distributed under the MIT license. See [LICENSE](LICENSE) for more information.
