# prettier-plugin-solidity

work in progress [prettier plugin](https://github.com/prettier/prettier/issues/4180) for [solidity](https://github.com/ethereum/solidity)

## Resources

- https://github.com/mattiaerre/prettier-plugin-solidity/issues/2

## Test

```bash
node_modules/prettier/bin-prettier.js --write **/*.sol --plugin=./src
```

## Use

```bash
node_modules/prettier/bin-prettier.js --write **/*.sol --plugin=./node_modules/prettier-plugin-solidity
```
