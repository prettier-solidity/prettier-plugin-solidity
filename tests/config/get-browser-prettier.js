import getRuntimeBrowser from "./get-runtime-browser.js";

// `args` are the real Prettier function's own positional arguments, with
// `options` at `optionsIndex` (matching that function's signature).
function callBrowserPrettier(page, path, args, optionsIndex = 1) {
  return page
    .evaluate(
      async ([path, args, optionsIndex]) => {
        try {
          args[optionsIndex] = window.__withPlugins(args[optionsIndex]);
          // we navigate from window.__prettier to fetch the method to execute
          // e.g. "__debug.parse" reaches window.__prettier.__debug.parse
          const method = path
            .split(".")
            .reduce((object, key) => object[key], window.__prettier);
          const value = await method(...args);
          return { ok: true, value };
        } catch (error) {
          // We catch the error and send it the message so Playwright doesn't
          // use its own PlaywrightError.
          return { ok: false, message: error.message };
        }
      },
      [path, args, optionsIndex],
    )
    .then(({ ok, value, message }) => {
      if (!ok) {
        throw new Error(message);
      }
      return value;
    });
}

async function createBrowserPrettier() {
  const wsEndpoint = process.env.BROWSER_STANDALONE_WS_ENDPOINT;
  const port = process.env.BROWSER_STANDALONE_SERVER_PORT;

  if (!wsEndpoint || !port) {
    throw new Error(
      "TEST_STANDALONE_BROWSER requires the browser-standalone globalSetup to have run. Use `npm run test:standalone:browser` rather than invoking jest directly.",
    );
  }

  const browserType = getRuntimeBrowser();
  const browser = await browserType.connect(wsEndpoint);
  const page = await browser.newPage();

  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error));

  await page.goto(`http://localhost:${port}/`);
  await page.waitForFunction(
    () => window.__prettier != null && window.__plugins != null,
  );

  if (pageErrors.length > 0) {
    throw pageErrors[0];
  }

  // `plugins` holds real imported module objects (functions and all), which
  // can't cross the Node <-> browser boundary, so it's dropped here; the
  // page already has its own copy loaded (see browser-standalone-server.js)
  // and merges it back in before calling into Prettier.
  return {
    formatWithCursor: async (input, { plugins, ...options }) =>
      callBrowserPrettier(page, "formatWithCursor", [input, options]),

    getSupportInfo: async ({ plugins, ...options }) =>
      callBrowserPrettier(page, "getSupportInfo", [options], 0),

    __debug: {
      parse: async (input, { plugins, ...options }, extra) =>
        callBrowserPrettier(page, "__debug.parse", [input, options, extra]),
    },
  };
}

let promise;
function getBrowserPrettier() {
  promise = promise ?? createBrowserPrettier();
  return promise;
}

export default getBrowserPrettier;
