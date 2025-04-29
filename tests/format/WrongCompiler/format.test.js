// Should warn twice
runFormatTest(import.meta, ['antlr'], { compiler: '0.8.4' });
// Should warn once
runFormatTest(import.meta, ['antlr'], {
  compiler: 'v0.7.5-nightly.2020.11.9+commit.41f50365'
});
// Should not warn
runFormatTest(import.meta, ['antlr'], {
  compiler: 'v0.7.3+commit.9bfce1f6'
});
