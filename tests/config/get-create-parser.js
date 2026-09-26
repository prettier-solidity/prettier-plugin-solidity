import { TEST_STANDALONE } from "./constants.js";

function getCreateParserInternal() {
  const entry = TEST_STANDALONE
    ? "../../dist/create-parser.js"
    : "../../src/slang-utils/create-parser.ts";

  return import(entry).then((module) => module.createParser);
}

let promise;
function getCreateParser() {
  promise = promise ?? getCreateParserInternal();

  return promise;
}

export default getCreateParser;
