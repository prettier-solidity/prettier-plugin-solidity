run_spec(import.meta, ['solidity-parse'], {
  compiler: '0.8.6',
  singleQuote: true
});
run_spec(import.meta, ['solidity-parse'], {
  compiler: '0.8.6',
  singleQuote: false
});
run_spec(import.meta, ['solidity-slang-parse'], {
  compiler: '0.8.25',
  singleQuote: true
});
run_spec(import.meta, ['solidity-slang-parse'], {
  compiler: '0.8.25',
  singleQuote: false
});
