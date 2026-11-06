import { TEST_STANDALONE } from "./constants.js";

function getInferAndParseInternal() {
  const entry = TEST_STANDALONE
    ? "../../dist-test/infer-and-parse.js"
    : "../../src/slang-utils/infer-and-parse.ts";

  return import(entry).then((module) => module.inferAndParse);
}

let promise;
function getInferAndParse() {
  promise = promise ?? getInferAndParseInternal();

  return promise;
}

export default getInferAndParse;
