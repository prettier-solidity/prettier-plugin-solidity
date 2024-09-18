function importSolcInternal() {
  return import("solc").then((module) => module.default);
}

let promise;
function importSolc() {
  promise = promise ?? importSolcInternal();

  return promise;
}

async function compileContract(filename, content) {
  const solc = await importSolc();
  const input = {
    language: "Solidity",
    sources: {
      [filename]: {
        content,
      },
    },
    settings: {
      metadata: { bytecodeHash: "none" },
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  // We throw if the contract doesn't compile.
  if (output.errors?.length > 0) {
    throw output.errors[0].formattedMessage;
  }

  const compiledContracts = output.contracts[filename];
  return Object.keys(compiledContracts).reduce(
    (byteCodes, contractName) => ({
      ...byteCodes,
      [contractName]: compiledContracts[contractName].evm.bytecode.object,
    }),
    {},
  );
}

export default compileContract;
