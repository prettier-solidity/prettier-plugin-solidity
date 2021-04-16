const solc = require('solc');

function compileContract(filename, content) {
  const input = {
    language: 'Solidity',
    sources: {
      [filename]: {
        content
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  // We throw if the contract doesn't compile.
  if (output.errors && output.errors.length > 0) {
    throw output.errors[0].formattedMessage;
  }

  const compiledContracts = output.contracts[filename];
  const bytecodes = {};
  Object.keys(compiledContracts).forEach((contractName) => {
    const contract = compiledContracts[contractName].evm;
    const bytecode = contract.bytecode.object;
    bytecodes[contractName] = bytecode.substring(
      0,
      // We have to remove the auxdata at the end of the compiled bytecode.
      bytecode.lastIndexOf(contract.legacyAssembly['.data']['0']['.auxdata'])
    );
  });
  return bytecodes;
}

module.exports = compileContract;
