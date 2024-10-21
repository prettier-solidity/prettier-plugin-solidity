function getPrettierInternal() {
  const entry = process.env.TEST_STANDALONE
    ? "prettier/standalone"
    : "prettier";

  return import(entry).then((module) => module.default);
}

let promise;
function getPrettier() {
  promise = promise ?? getPrettierInternal();

  return promise;
}

export default getPrettier;
