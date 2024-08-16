runFormatTest(import.meta, ['solidity-parse'], {
  compiler: '0.8.6',
  singleQuote: true
});
runFormatTest(import.meta, ['solidity-parse'], {
  compiler: '0.8.6',
  singleQuote: false
});
