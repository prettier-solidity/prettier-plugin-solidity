import path from "node:path";
import { TEST_STANDALONE, PRETTIER_PLUGIN_NAMES } from "./constants.js";

const __dirname = import.meta.dirname;

function getPluginsInternal() {
  return Promise.all(
    TEST_STANDALONE
      ? [
          ...PRETTIER_PLUGIN_NAMES.map(
            (name) => import(`prettier/plugins/${name}`),
          ),
          import("prettier-plugin-solidity/standalone"),
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
