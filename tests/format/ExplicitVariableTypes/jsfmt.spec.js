run_spec(__dirname, ['solidity-parse'], { compiler: '0.8.5' });
run_spec(__dirname, ['solidity-parse'], {
  compiler: '0.8.5',
  explicitTypes: 'never'
});
run_spec(__dirname, ['solidity-parse'], {
  compiler: '0.8.5',
  explicitTypes: 'preserve'
});
