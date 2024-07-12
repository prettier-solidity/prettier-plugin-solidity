runFormatTest(import.meta, ['slang']);
runFormatTest(import.meta, ['slang'], { experimentalTernaries: true });
runFormatTest(import.meta, ['slang'], {
  experimentalTernaries: true,
  tabWidth: 1
});
runFormatTest(import.meta, ['slang'], {
  experimentalTernaries: true,
  useTabs: true
});
