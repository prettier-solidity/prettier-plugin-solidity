runFormatTest(import.meta, ['slang-solidity'], { compiler: '0.8.28' });
runFormatTest(import.meta, ['slang-solidity'], {
  bracketSpacing: true,
  compiler: '0.8.28'
});
runFormatTest(import.meta, ['solidity-parse']);
runFormatTest(import.meta, ['solidity-parse'], { bracketSpacing: true });
