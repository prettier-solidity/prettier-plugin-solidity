run_spec(import.meta, ['solidity-parse'], { singleQuote: true });
run_spec(import.meta, ['solidity-parse'], { singleQuote: false });
run_spec(import.meta, ['slang'], {
  compiler: '0.8.25',
  singleQuote: true
});
run_spec(import.meta, ['slang'], {
  compiler: '0.8.25',
  singleQuote: false
});
