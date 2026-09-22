import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const __dirname = import.meta.dirname;
const distDir = path.resolve(__dirname, '../../../dist');
const prettierStandalonePath = path.resolve(
  __dirname,
  '../../../node_modules/prettier/standalone.js'
);

const tests = [
  {
    testName: 'loading both bundles via dynamic import',
    url: '/dynamic-import.html',
    content: `<!doctype html>
    <script type="module">
      await import('/prettier-standalone.js');
      await import('/dist/standalone.js');
      window.__format = (code) =>
        window.prettier.format(code, {
          parser: 'slang',
          plugins: window.prettierPlugins
        });
    </script>`
  },
  {
    testName: 'loading both bundles via individual script tags',
    url: '/script-tags.html',
    content: `<!doctype html>
    <script type="module" src="/prettier-standalone.js"></script>
    <script type="module" src="/dist/standalone.js"></script>
    <script type="module">
      window.__format = (code) =>
        window.prettier.format(code, {
          parser: 'slang',
          plugins: [window.prettierPlugins.solidity]
        });
    </script>`
  },
  {
    testName: 'loading the pre-bundled dist/test.js',
    url: '/bundle.html',
    content: `<!doctype html>
    <script type="module">
      const { default: format } = await import('/dist/test.js');
      window.__format = format;
    </script>`
  }
];

const contentTypes = {
  '.js': 'text/javascript',
  '.wasm': 'application/wasm',
  '.html': 'text/html'
};

function respond(res, content, ext) {
  res.writeHead(200, {
    'Content-Type': contentTypes[ext] || 'application/octet-stream'
  });
  res.end(content);
}

function startServer() {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const page = tests.find(({ url }) => url === req.url);
      if (page) {
        respond(res, page.content, '.html');
        return;
      }

      if (req.url === '/prettier-standalone.js') {
        readFile(prettierStandalonePath).then((content) =>
          respond(res, content, '.js')
        );
        return;
      }

      if (req.url.startsWith('/dist/')) {
        const relativePath = req.url.slice('/dist/'.length);
        const filePath = path.join(distDir, relativePath);

        // Reject `..` segments that would resolve outside of `distDir`.
        if (filePath !== distDir && !filePath.startsWith(distDir + path.sep)) {
          res.writeHead(404);
          res.end();
          return;
        }

        readFile(filePath).then(
          (content) => respond(res, content, path.extname(filePath)),
          () => {
            res.writeHead(404);
            res.end();
          }
        );
        return;
      }

      res.writeHead(404);
      res.end();
    });

    server.on('error', reject);
    server.listen(0, () => resolve(server));
  });
}

describe('standalone bundle in a real browser', () => {
  let server;
  let port;
  let browser;

  beforeAll(async () => {
    server = await startServer();
    port = server.address().port;
    browser = await chromium.launch();
  }, 30000);

  afterAll(async () => {
    await browser.close();
    server.close();
  });

  for (const { testName, url } of tests) {
    test(
      testName,
      async () => {
        const page = await browser.newPage();
        const pageErrors = [];
        page.on('pageerror', (error) => pageErrors.push(error));

        await page.goto(`http://localhost:${port}${url}`);
        await page.waitForFunction(() => typeof window.__format === 'function');

        if (pageErrors.length > 0) {
          throw pageErrors[0];
        }

        const result = await page.evaluate(
          (code) => window.__format(code),
          'contract    CheckPackage {}'
        );

        expect(result).toEqual('contract CheckPackage {}\n');
      },
      30000
    );
  }
});
