function getCreateParserInternal() {
  const entry = process.env.TEST_STANDALONE
    ? "../../dist/create-parser.js"
    : "../../src/slang-utils/create-parser.js";

  return import(entry).then((module) => module.createParser);
}

let promise;
function getCreateParser() {
  promise = promise ?? getCreateParserInternal();

  return promise;
}

export default getCreateParser;
