run_spec(import.meta, ['solidity-parse']);
run_spec(import.meta, ['solidity-parse'], { experimentalTernaries: true });
run_spec(import.meta, ['solidity-parse'], {
  experimentalTernaries: true,
  tabWidth: 1
});
run_spec(import.meta, ['solidity-parse'], {
  experimentalTernaries: true,
  useTabs: true
});
