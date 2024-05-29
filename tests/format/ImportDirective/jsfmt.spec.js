run_spec(import.meta, ['solidity-parse']);
run_spec(import.meta, ['solidity-parse'], { bracketSpacing: true });
run_spec(import.meta, ['solidity-slang-parse'], { compiler: '0.4.26' });
run_spec(import.meta, ['solidity-slang-parse'], {
  bracketSpacing: true,
  compiler: '0.4.26'
});
