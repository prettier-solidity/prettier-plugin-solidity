import path from "node:path";
import createEsmUtils from "esm-utils";
import getPrettier from "./get-prettier.js";
import { TEST_STANDALONE } from "./constants.js";

const { __dirname } = createEsmUtils(import.meta);

// populate the root object for the standalone in node
if (TEST_STANDALONE) {
  const root =
    typeof globalThis !== "undefined"
      ? globalThis
      : typeof global !== "undefined"
        ? global
        : typeof self !== "undefined"
          ? self
          : this || {};
  root.prettier = await getPrettier();
}

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
