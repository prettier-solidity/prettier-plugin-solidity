import { TEST_STANDALONE } from "./constants.js";

function getVariantCoverageInternal() {
  const entry = TEST_STANDALONE
    ? "../../dist/variant-coverage.js"
    : "../../variant-coverage/index.js";

  return import(entry).then((module) => module.variantCoverage);
}

let promise;
function getVariantCoverage() {
  promise = promise ?? getVariantCoverageInternal();

  return promise;
}

export default getVariantCoverage;
