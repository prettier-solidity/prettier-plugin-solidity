import { createRequire } from "node:module";
import path from "node:path";
import createEsmUtils from "esm-utils";
import { satisfies } from "semver";
import getPrettier from "./get-prettier.js";

const { __dirname } = createEsmUtils(import.meta);

async function getPluginsInternal() {
  if (!process.env.TEST_STANDALONE) {
    return [path.join(__dirname, "../../src/index.ts")];
  }

  const require = createRequire(import.meta.url);
  const prettier = await getPrettier();

  const prettierPath = path.dirname(require.resolve("prettier"));
  const pluginPrefix = satisfies(prettier.version, "^2.3.0")
    ? "parser-" // Prettier V2
    : "plugins/"; // Prettier V3
  const babel = path.join(prettierPath, `${pluginPrefix}babel.js`);
  const markdown = path.join(prettierPath, `${pluginPrefix}markdown.js`);
  const standalone = path.join(__dirname, "../../dist/standalone.js");

  return [
    (await import(babel)).default,
    (await import(markdown)).default,
    (await import(standalone)).default,
  ];
}

let promise;
function getPlugins() {
  promise = promise ?? getPluginsInternal();

  return promise;
}

export default getPlugins;
