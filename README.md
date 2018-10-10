# prettier-plugin-solidity

work in progress [prettier plugin](https://github.com/prettier/prettier/issues/4180) for [solidity](https://github.com/ethereum/solidity)

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
