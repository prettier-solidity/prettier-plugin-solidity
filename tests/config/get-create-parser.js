import { TEST_STANDALONE } from "./constants.js";

function getCreateParserInternal() {
  const entry = TEST_STANDALONE
    ? "../../dist/create-parser.js"
    : "./create-parser-entry.js";

  return import(entry).then(async (module) => {
    await module.loadSlang();
    return module.createParser;
  });
}

let promise;
function getCreateParser() {
  promise = promise ?? getCreateParserInternal();

  return promise;
}

export default getCreateParser;
