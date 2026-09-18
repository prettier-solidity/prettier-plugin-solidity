import path from "node:path";
import createEsmUtils from "esm-utils";
import { startStaticServer } from "./static-server.js";

const { __dirname } = createEsmUtils(import.meta);

const distDir = path.resolve(__dirname, "../../dist");
const prettierDir = path.resolve(__dirname, "../../node_modules/prettier");

// Loaded once per worker page. Mirrors what `get-plugins.js` loads in Node
// for `TEST_STANDALONE`, plus Prettier itself, all as real ES modules served
// over HTTP so a real browser can `import()` them.
const html = `<!doctype html>
<script type="module">
  const [prettier, babel, estree, markdown, solidity] = await Promise.all([
    import('/prettier/standalone.mjs'),
    import('/prettier/plugins/babel.mjs'),
    import('/prettier/plugins/estree.mjs'),
    import('/prettier/plugins/markdown.mjs'),
    import('/dist/standalone.js'),
  ]);
  window.__prettier = prettier;
  window.__plugins = [babel, estree, markdown, solidity].map(
    (module) => module.default ?? module,
  );

  // Plugin objects (functions and all) can't be sent from Node over
  // page.evaluate, so Node sends indices into \`window.__plugins\` instead
  // (see get-browser-prettier.js) and this swaps them back before the real
  // Prettier call.
  window.__resolveOptions = (options) => {
    const { pluginIndices, ...rest } = options;
    return pluginIndices
      ? { ...rest, plugins: pluginIndices.map((index) => window.__plugins[index]) }
      : options;
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
