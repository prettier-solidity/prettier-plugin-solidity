function getCheckCoverageInternal() {
  const entry = process.env.TEST_STANDALONE
    ? "../../dist/check-coverage.js"
    : "../../check-coverage/index.js";

  return import(entry).then((module) => module.checkCoverage);
}

let promise;
function getCheckCoverage() {
  promise = promise ?? getCheckCoverageInternal();

  return promise;
}

export default getCheckCoverage;
