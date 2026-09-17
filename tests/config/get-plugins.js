import path from "node:path";
import createEsmUtils from "esm-utils";
import { TEST_STANDALONE } from "./constants.js";

const { __dirname } = createEsmUtils(import.meta);

function getPluginsInternal() {
  return Promise.all(
    TEST_STANDALONE
      ? [
          import("prettier/plugins/babel"),
          import("prettier/plugins/estree"),
          import("prettier/plugins/markdown"),
          import(path.join(__dirname, "../../dist/standalone.js")),
        ]
      : [path.join(__dirname, "../../src/index.ts")],
  ).then((modules) => modules.map((module) => module.default ?? module));
}

let promise;
function getPlugins() {
  promise = promise ?? getPluginsInternal();

  return promise;
}

export default getPlugins;
