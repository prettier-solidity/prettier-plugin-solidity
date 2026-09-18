import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";

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

function notFound(res) {
  res.writeHead(404);
  res.end();
}

/**
Starts a static HTTP server on a random free port, for tests that need a
real browser to `fetch`/`import` served content.

@param {[url: string, content: string][]} [pages] Exact URLs served as
  inline HTML content.
@param {[url: string, filePath: string][]} [files] Exact URLs served from a
  single file on disk, with the content type inferred from its extension.
@param {[urlPrefix: string, directory: string][]} [roots] URL prefixes
  served from a directory on disk, with the content type inferred per file.
@returns {Promise<import("node:http").Server>}
*/
function startStaticServer({ pages = [], files = [], roots = [] } = {}) {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const page = pages.find(([url]) => url === req.url);
      if (page) {
        respond(res, page[1], ".html");
        return;
      }

      const file = files.find(([url]) => url === req.url);
      if (file) {
        const [, filePath] = file;
        readFile(filePath).then(
          (content) => respond(res, content, path.extname(filePath)),
          () => notFound(res),
        );
        return;
      }

      const root = roots.find(([prefix]) => req.url.startsWith(prefix));
      if (root) {
        const [prefix, dir] = root;
        const relativePath = req.url.slice(prefix.length);
        readFile(path.join(dir, relativePath)).then(
          (content) => respond(res, content, path.extname(relativePath)),
          () => notFound(res),
        );
        return;
      }

      notFound(res);
    });

    server.on("error", reject);
    server.listen(0, () => resolve(server));
  });
}

export { startStaticServer };
