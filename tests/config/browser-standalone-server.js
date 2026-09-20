import path from "node:path";
import { startStaticServer } from "./static-server.js";
import { PRETTIER_PLUGIN_NAMES } from "./constants.js";

const __dirname = import.meta.dirname;

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

  // get-browser-prettier.js drops \`options.plugins\` before calling here,
  // since real plugin objects can't cross page.evaluate, so this always
  // uses the page's own copy instead.
  window.__withPlugins = (options) => ({
    ...options,
    plugins: window.__plugins,
  });
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
