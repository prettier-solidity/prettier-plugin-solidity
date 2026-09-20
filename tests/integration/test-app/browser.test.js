import path from 'node:path';
import { startStaticServer } from '../../config/static-server.js';
import getRuntimeBrowser from '../../config/get-runtime-browser.js';

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
      window.__done = true;
    </script>`
  }
];

function startServer() {
  return startStaticServer({
    pages: tests.map(({ url, content }) => [url, content]),
    files: [['/prettier-standalone.js', prettierStandalonePath]],
    roots: [['/dist/', distDir]]
  });
}

describe('standalone bundle in a real browser', () => {
  let server;
  let port;
  let browser;

  beforeAll(async () => {
    server = await startServer();
    port = server.address().port;
    browser = await getRuntimeBrowser().launch();
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
        await page.waitForFunction(
          () => (window.prettier && window.prettierPlugins) || window.__done
        );

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
