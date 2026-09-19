import path from "node:path";
import createEsmUtils from "esm-utils";
import { startStaticServer } from "./static-server.js";
import { PRETTIER_PLUGIN_NAMES } from "./constants.js";

const { __dirname } = createEsmUtils(import.meta);

const distDir = path.resolve(__dirname, "../../dist");
const prettierDir = path.resolve(__dirname, "../../node_modules/prettier");

// Loaded once per worker page. Mirrors what `get-plugins.js` loads in Node
// for `TEST_STANDALONE`, plus Prettier itself, all as real ES modules served
// over HTTP so a real browser can `import()` them.
const html = `<!doctype html>
<script type="module">
  const [prettier, ...plugins] = await Promise.all([
    import('/prettier/standalone.mjs'),
    ${PRETTIER_PLUGIN_NAMES.map((name) => `import('/prettier/plugins/${name}.mjs')`).join(",\n    ")},
    import('/dist/standalone.js'),
  ]);
  window.__prettier = prettier;
  window.__plugins = plugins.map((module) => module.default ?? module);

  // Plugin objects (functions and all) can't be sent from Node over
  // page.evaluate, so Node sends "all" or "solidity" instead, matching
  // whichever of those two shapes \`options.plugins\` was (see
  // get-browser-prettier.js), and this swaps in the real plugins before the
  // real Prettier call.
  window.__resolveOptions = (options) => {
    const { plugins, ...rest } = options;
    if (plugins === "all") {
      return { ...rest, plugins: window.__plugins };
    }
    if (plugins === "solidity") {
      return { ...rest, plugins: [window.__plugins.at(-1)] };
    }
    return options;
  };
</script>`;

function startStandaloneServer() {
  return startStaticServer({
    pages: [
      ["/", html],
      ["/index.html", html],
    ],
    roots: [
      ["/dist/", distDir],
      ["/prettier/", prettierDir],
    ],
  });
}

export { startStandaloneServer };
