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
    sources: { [filename]: { content } },
    settings: {
      metadata: { bytecodeHash: "none" },
      outputSelection: {
        "*": {
          "*": ["evm.bytecode.object"],
        },
      },
    },
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  // We throw if the contract doesn't compile, warnings are fine.
  const errors = output.errors?.filter(({ severity }) => severity === "error");
  if (errors?.length > 0) {
    throw new Error(errors.map((error) => error.formattedMessage).join("\n"));
  }

  return Object.fromEntries(
    Object.entries(output.contracts[filename]).map(
      ([contractName, { evm }]) => [contractName, evm.bytecode.object],
    ),
  );
}

export default compileContract;
