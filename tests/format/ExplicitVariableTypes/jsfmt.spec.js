run_spec(__dirname, ['solidity-parse']);
run_spec(__dirname, ['solidity-parse'], { explicitTypes: 'never' });
run_spec(__dirname, ['solidity-parse'], { explicitTypes: 'preserve' });
