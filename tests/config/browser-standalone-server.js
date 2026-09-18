import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import createEsmUtils from "esm-utils";

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

const contentTypes = {
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".wasm": "application/wasm",
  ".html": "text/html",
};

function respond(res, content, ext) {
  res.writeHead(200, {
    "Content-Type": contentTypes[ext] || "application/octet-stream",
  });
  res.end(content);
}

const roots = [
  ["/dist/", distDir],
  ["/prettier/", prettierDir],
];

function startStandaloneServer() {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      if (req.url === "/" || req.url === "/index.html") {
        respond(res, html, ".html");
        return;
      }

      const root = roots.find(([prefix]) => req.url.startsWith(prefix));
      if (root) {
        const [prefix, dir] = root;
        const relativePath = req.url.slice(prefix.length);
        readFile(path.join(dir, relativePath)).then(
          (content) => respond(res, content, path.extname(relativePath)),
          () => {
            res.writeHead(404);
            res.end();
          },
        );
        return;
      }

      res.writeHead(404);
      res.end();
    });

    server.on("error", reject);
    server.listen(0, () => resolve(server));
  });
}

export { startStandaloneServer };
