runFormatTest(import.meta, ['slang-solidity']);
runFormatTest(import.meta, ['slang-solidity'], { experimentalTernaries: true });
runFormatTest(import.meta, ['slang-solidity'], {
  experimentalTernaries: true,
  tabWidth: 1
});
runFormatTest(import.meta, ['slang-solidity'], {
  experimentalTernaries: true,
  useTabs: true
});
