runFormatTest(import.meta, ['solidity-parse'], { compiler: '0.7.4' });
runFormatTest(import.meta, ['solidity-parse'], {
  compiler: '0.7.4',
  bracketSpacing: true
});
runFormatTest(import.meta, ['solidity-parse'], { compiler: '0.7.3' });
runFormatTest(import.meta, ['solidity-parse'], {
  compiler: '0.7.3',
  bracketSpacing: true
});
runFormatTest(import.meta, ['solidity-parse']);
runFormatTest(import.meta, ['solidity-parse'], {
  bracketSpacing: true
});
