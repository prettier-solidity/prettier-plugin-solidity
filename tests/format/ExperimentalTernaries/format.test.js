runFormatTest(import.meta, ['solidity-parse']);
runFormatTest(import.meta, ['solidity-parse'], { experimentalTernaries: true });
runFormatTest(import.meta, ['solidity-parse'], {
  experimentalTernaries: true,
  tabWidth: 1
});
runFormatTest(import.meta, ['solidity-parse'], {
  experimentalTernaries: true,
  useTabs: true
});
